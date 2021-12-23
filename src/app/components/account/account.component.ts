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
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public form: FormGroup = Object.create(null);
  ngUme: any;
  umeData: any;
  umeUSD: any;
  sumUSD: number = 0;
  umeCDF: any;
  sumCDF: number = 0;
  usdWallet: any;
  cdfWallet: any;
  usdRate: any;
  cdfRate: any;
  usdTotal: any;
  cdfTotal: any;

  umeAccount: any;

user: any;

  constructor(public dialog: MatDialog, public umeService:AuthService, public fb: FormBuilder, public toastr: ToastrService,public router: Router,
    public ngZone: NgZone) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
     }

  @ViewChild(MatTable, {static: true}) tableUme: MatTable<any> = Object.create(null);
  @ViewChild(MatSort) sort: MatSort = Object.create(null);
  @ViewChild(MatPaginator) paginator: MatPaginator = Object.create(null);

  searchUme: any;
  displayUme: string[] = ['transaction','from','amount','type','time'];
  umeDataSource!: MatTableDataSource<any>;

  ngOnInit(): void {
    console.log(this.user);
    this.umeService.getWhere('umepayEntry','account',this.user.email).subscribe(data =>{
      this.ngUme = data.map(e =>{
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        };
      })
      console.log(this.ngUme);
      this.umeDataSource = new MatTableDataSource(this.ngUme);
      this.umeDataSource.paginator = this.paginator;
      this.umeDataSource.sort = this.sort;
    });

    this.umeService.getWhere('users','uid', this.user.uid).subscribe(data =>{
      this.umeAccount = data.map(e =>{
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data() as any
        }
      })
      // retrieve them from here
    })

  }

  applyFilterUme(filterValue: string): void{
    this.umeDataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialogUme(action: string, obj:any, id:any): void{
    obj.action = action;
    obj.inId = id;
    const dialogRef = this.dialog.open(EntryDialogContent,{
      data: obj,
      disableClose: true,
    })
  }
}

// data entry agent
@Component({
  selector: 'entry-content',
  templateUrl: './entry.dialog.html',
})

export class EntryDialogContent{

  public entryForm: FormGroup = Object.create(null);
  action: string;
  local_data: any;
  transId: any;
  dataId: any;
  usdIncome: number = 0;
  cdfIncome: number = 0;

  usdwallet: any;
  usdBias:any;
  usdLocked:any;
  cdfwallet: any;
  cdfBias:any;
  cdfLocked:any;


  public usdTotal!: number;
  public cdfTotal!: number;
  public savingId: any;
  public local: any;

  umeValue: any;
  user: any;

  constructor(public _db: AngularFirestore, public dialogRef: MatDialogRef<EntryDialogContent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public fb: FormBuilder, public umeService: AuthService, public toastr: ToastrService){
    this.local_data = {...data};
    this.action = this.local_data.action;
    this.transId = Date.now();
    this.user = JSON.parse(localStorage.getItem('user') as string);
  }

  ngOnInit(){
    this.entriesForm();
  }

  entriesForm(){
    this.entryForm = this.fb.group({
      account: ['', Validators.required],
      from: this.user.email,
      amount: ['', Validators.required],
      currency:['',Validators.required],
      type: 'Agent',
      transactionId: this.transId,
      createdAt: new Date(),
      createdBy: this.user.uid,
    })
  }

  get amount(){
    return this.entryForm?.get('amount');
  }

  get account(){
    return this.entryForm?.get('account');
  }

  get currency(){
    return this.entryForm?.get('currency');
  }

  addTotal(){

  }

  doAction(id: any): void{
    this.dialogRef.close({event: this.action});

    if(this.action === 'Add'){
      this.umeService.createDoc(this.entryForm.value, 'umepayEntry').then(data =>{

      });
      this.umeService.getWhereOnce('users','email',this.entryForm.controls['account'].value).subscribe(data =>{
        this.umeValue = data;
        //   return {
        //     id: e.payload.doc.id,
        //     ...e.payload.doc.data() as any
        //   }
        // })
        console.log(this.umeValue);
      });
      console.log(this.umeValue);
        // this.umeValue = data.map(e =>{
        //   return {
        //     id: e.payload.doc.id,
        //     ...e.payload.doc.data() as any
        //   }
        // })
        // do here
        // this.umeValue.forEach((clientAccount: { usdincome: string; cdfincome: string; uid: any; }) => {
        //   if(this.entryForm.controls['currency'].value === '$'){
        //     this.usdIncome = parseFloat(this.entryForm.controls['amount'].value);
        //     this.cdfIncome = 0;
        //   }else if(this.entryForm.controls['currency'].value === 'Fc'){
        //     this.cdfIncome = parseFloat(this.entryForm.controls['amount'].value);
        //     this.usdIncome = 0;
        //   }
        //   // console.log(this.entryForm.controls['amount'].value)
        //   // if(parseFloat(clientAccount.usdTotal) !== NaN){

        //   // }
        //   if(typeof clientAccount.usdincome != 'string' || typeof clientAccount.usdincome != 'undefined'){
        //     this.usdTotal = parseFloat(clientAccount.usdincome) + this.usdIncome;
        //     // console.log(typeof clientAccount.usdincome);
        //   }else{
        //     this.usdTotal = this.usdIncome;
        //   }

        //   if(typeof clientAccount.cdfincome != 'string'  || typeof clientAccount.cdfincome != 'undefined'){
        //     this.cdfTotal = parseFloat(clientAccount.cdfincome) + this.cdfIncome;
        //     // console.log(typeof clientAccount.usdincome);
        //   }else{
        //     this.cdfTotal = this.cdfIncome;
        //   }
        //   this.savingId = clientAccount.uid;
        //   console.log(this.savingId);

        // });
        // for(let clientAccount of this.umeValue){
        //   // currency check
        //   // console.log(clientAccount);
        //   // if(clientAccount.usdincome){
        //   //   this.usdIncome =
        //   // }
        //   if(this.entryForm.controls['currency'].value === '$'){
        //     this.usdIncome = parseFloat(this.entryForm.controls['amount'].value);
        //     this.cdfIncome = 0;
        //   }else if(this.entryForm.controls['currency'].value === 'Fc'){
        //     this.cdfIncome = parseFloat(this.entryForm.controls['amount'].value);
        //     this.usdIncome = 0;
        //   }
        //   console.log(this.entryForm.controls['amount'].value)
        //   // if(parseFloat(clientAccount.usdTotal) !== NaN){

        //   // }
        //   if(typeof clientAccount.usdincome != 'string' || clientAccount.usdincome != NaN || typeof clientAccount.usdincome != 'undefined'){
        //     this.usdTotal = parseFloat(clientAccount.usdincome) + this.usdIncome;
        //     // console.log(typeof clientAccount.usdincome);
        //   }else{
        //     this.usdTotal = this.usdIncome;
        //   }

        //   if(typeof clientAccount.cdfincome != 'string' || clientAccount.cdfincome != NaN || typeof clientAccount.cdfincome != 'undefined'){
        //     this.cdfTotal = parseFloat(clientAccount.cdfincome) + this.cdfIncome;
        //     // console.log(typeof clientAccount.usdincome);
        //   }else{
        //     this.cdfTotal = this.cdfIncome;
        //   }
        //   this.savingId = clientAccount.uid;
        //   console.log(this.savingId);
        // }

        // this.local = [{
        //   usdTotal: this.usdTotal,
        //   cdfTotal: this.cdfTotal,
        //   savingId: this.savingId
        // }]

        // localStorage.setItem('account', JSON.stringify(this.local));

      // this.umeService.updateDoc(this.savingId,{
      //   cdfincome: this.cdfTotal,
      //   usdincome: this.usdTotal,
      // }, 'users').then(
      //   hello.unsubscribe
      // ).catch(err =>{
      //   console.log(err);
      // })

      // })
      // update account
      // console.log(this.savingId);
      // console.log(this.usdTotal);
      // console.log(this.cdfTotal);
       console.log(JSON.parse(localStorage.getItem('account') as string));
      let parse = JSON.parse(localStorage.getItem('account') as string);
      let usd = parseFloat(parse.usdTotal);
    let cdf = parseFloat(parse.cdfTotal);
    let id = parse.savingId;
    console.log(id);
    this.umeService.updateDoc(id,{
        cdfincome: cdf,
        usdincome: usd,
      }, 'users').then(
        // hello.unsubscribe
      ).catch(err =>{
        console.log(err);
      })
    // console.log(usd, cdf);

    }
  }

  closeDialog(): void{
    // update it here
    // let parse = JSON.parse(localStorage.getItem('account') as string);
    // let usd = parseFloat(parse.usdTotal);
    // let cdf = parseFloat(parse.cdfTotal);
    // console.log(usd, cdf);
    this.entryForm.reset();
    this.dialogRef.close({event: 'Cancel'});
  }

}


