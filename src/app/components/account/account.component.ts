import { Component, Inject, NgZone, OnInit, Optional, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import{uniq, flatten} from 'lodash';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  billList: any;
  selectedData = 'All';
  user: any;
  filterData: any;
  joined$:any;
  shareSum: number = 0;
  transSum: number = 0;


  constructor(public dialog: MatDialog, public umeService:AuthService, public fb: FormBuilder, public toastr: ToastrService,public router: Router,
    public ngZone: NgZone, public afs: AngularFirestore) {
      this.user = JSON.parse(localStorage.getItem('user') as string);
      // console.log(this.user.uid);
      // this.umeService.getWhereOnce('transaction', 'cretedBy',this.user.uid).forEach(data =>{
      //   this.billList = data;
      // this.billList?.forEach((bill:any) => {
      //   this.shareSum = this.shareSum + parseFloat(bill.itemQuantity);
      //   this.transSum = this.transSum + parseFloat(bill.itemCost);
      //   console.log(this.shareSum);
      // });
      // // for()
      // })
      this.getData();

    }
 ngOnInit()
 {

  }

  getData(): void{
    this.afs.collection<any>('transaction',ref => ref.where('createdBy','==',this.user.uid)).get().forEach(data =>{

      this.billList =  data.docs.map(e =>{
        return {
          id: e.id,
          ...e.data() as any,
        }
      });
      // console.log(this.billList);
      // console.log(this.billList.itemQuantity);
       this.billList.forEach((bill:any) => {
        this.shareSum = this.shareSum + parseFloat(bill.itemQuantity);
        this.transSum = this.transSum + parseFloat(bill.itemCost);
        // console.log(this.shareSum);


      });
    })

    this.filterData = this.billList;
  }
  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.billList = this.filter(filterValue);
  }


  filter(v: string): any[]{
    // console.log(this.filterData.filter((x: any) => x.projectName.toLowerCase().indexOf(v.toLowerCase()) !== 1));
    return this.billList.filter((x: any) => x.projectName.toLowerCase().indexOf(v.toLowerCase()) !== 1);

  }

  ddlChange(ob: any): void{

    const filterValue = ob.value;
    console.log(ob.value);
    if(filterValue === 'All'){
      this.billList = this.filterData;
    }else{
      this.billList = this.filterData.filter((prod: any) => prod.category === filterValue);
    }

  }
}
