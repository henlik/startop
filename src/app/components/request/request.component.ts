import { Component, Inject, NgZone, OnInit, Optional, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {

  // pseudo data to work with efficiently


  public formed: FormGroup = Object.create(null);
  user: any;
  ngUme: any;
  constructor(public dialog: MatDialog, public umeService:AuthService, public fb: FormBuilder, public toastr: ToastrService,public router: Router,
    public ngZone: NgZone) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
     }

  @ViewChild(MatTable, {static: true}) tableUme: MatTable<any> = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  searchUme: any;
  displayUme: string[] = ['requestId','projectName','category','stage','time','action'];
  umeDataSource!: MatTableDataSource<any>;
  ngOnInit(): void {
    this.umeService.getWhere('pitchRequest','createdBy', this.user.uid).subscribe(data =>{
      this.ngUme = data.map(e =>{
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      })
      this.umeDataSource = new MatTableDataSource(this.ngUme);
      this.umeDataSource.paginator = this.paginator;
      this.umeDataSource.sort = this.sort;

    })


  }

  applyFilterUme(filterValue: string): void{
    this.umeDataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogUme(action: string, obj:any, id:any): void{
    obj.action = action;
    obj.inId = id;
    const dialogRef = this.dialog.open(RequestDialogContent,{
      data: obj,
      disableClose: true,
    })
  }

}

@Component({
  selector:'request-content',
  templateUrl: './request.dialog.html',
})
export class RequestDialogContent{

    public entryFormed: FormGroup = Object.create(null);
    public revisionForm: FormGroup = Object.create(null);
    public productForm: FormGroup = Object.create(null);
    action: string;
    local_data: any;
    requestId: any;
    dataId: any;

    umeValue:any;
    user: any;

    constructor(public _db: AngularFirestore, public dialogRef: MatDialogRef<RequestDialogContent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public umeService: AuthService, public toastr: ToastrService)
    {
      this.local_data = {...data};
      this.action = this.local_data.action;
      this.requestId = Date.now();
      this.user = JSON.parse(localStorage.getItem('user') as string);
    }


    ngOnInit()
    {
      this.entriesFormed();
      this.revisionRequest();
      this.productFormed();
      // console.log(this.user.uid);
    }

    entriesFormed()
    {
      this.entryFormed = this.fb.group({
        projectName: ['', [Validators.required]],
        companyName: ['', [Validators.required]],
        companyId: ['', [Validators.required]],
        category: ['', [Validators.required]],
        pitchTown: ['', [Validators.required]],
        briefDescription:['', [Validators.required]],
        projectStage:['', [Validators.required]],
        createdAt: new Date(),
        createdBy: this.user.uid,
        requestId: this.requestId,
      })
    }
    revisionRequest()
    {
      this.revisionForm = this.fb.group({
        note: ['', [Validators.required]],
        permission: ['', [Validators.required]],
        revisedBy: this.user.uid,
        revisedAt: new Date(),
      })
    }

    productFormed(){
      this.productForm = this.fb.group({
        pitchUrl: ['', [Validators.required]],
        shortDescription: ['', [Validators.required]],
        longDescription: ['', [Validators.required]],
        shares: ['', [Validators.required]],
        price:['', [Validators.required]],
        productBy: this.user.uid,
        productAt: new Date(),
      })

    }
    get projectName()
    {
      return this.entryFormed?.get('projectName');
    }

    get companyName()
    {
      return this.entryFormed.get('companyName');
    }

    get companyId()
    {
      return this.entryFormed.get('companyId');
    }

    get category()
    {
      return this.entryFormed.get('category');
    }

    get pitchTown()
    {
      return this.entryFormed.get('pitchTown');
    }

    get briefDescription()
    {
      return this.entryFormed.get('briefDescription');
    }

    get projectStage()
    {
      return this.entryFormed.get('projectStage');
    }
    get note()
    {
      return this.entryFormed.get('note');
    }
    get permission()
    {
      return this.entryFormed.get('permission');
    }

    doAction(id: any):void{
      this.dialogRef.close({event: this.action});

      if(this.action === 'Add'){
        // console.log(this.entryFormed.value);
        this.umeService.createDoc(this.entryFormed.value,'pitchRequest').then(data =>{
          this.toastr.success('Pitch request submitted successfully');
          console.log(data);
        }).catch(err =>{
          console.log(err);
        });
      }else if(this.action === 'Edit'){

      }else if(this.action === 'Response'){

      }else if(this.action === 'Delete'){

      }else if(this.action === 'Product'){
        // console.log(id);
        this.umeService.updateDoc(id, this.productForm.value, 'pitchRequest').then(data =>{
          console.log(data);
        }).catch(err =>{
          console.log(err);
        })

      }else if(this.action === 'View'){
        // console.log(id);
        this.umeService.updateDoc(id, this.revisionForm.value, 'pitchRequest').then(data =>{
          console.log(data);
        }).catch(err =>{
          console.log(err);
        })
      }
    }

    closeDialog(): void{
      this.entryFormed.reset();
      this.revisionForm.reset();
      this.dialogRef.close({event: 'Cancel'});
    }

}
