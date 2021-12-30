import { Component, Inject, NgZone, OnInit, Optional } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  // single element charm
  /*favorite:boolean = false;
  likes:number = 0;
  shares: number = 12;
  share: boolean = false;
  color: string = 'basic';
  percentile: number = 0;
  user: any;
  price: number = 100;
*/
  productList: any;
  selectedCategory = 'All';
  user: any;
  filterData: any;
  constructor(public dialog: MatDialog, public umeService:AuthService, public fb: FormBuilder, public toastr: ToastrService,public router: Router,
    public ngZone: NgZone) {

      this.user = JSON.parse(localStorage.getItem('user') as string);
      this.umeService.getWhere('pitchRequest','permission','Aproved').subscribe(data =>{
        this.productList = data.map(e =>{
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as any
          }
        });
        this.filterData = this.productList;
      })
     }

  ngOnInit(): void {
    // this.changer();
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.productList = this.filter(filterValue);
    // console.log(this.productList);
  }

  filter(v: string): any[]{
    // console.log(this.filterData.filter((x: any) => x.projectName.toLowerCase().indexOf(v.toLowerCase()) !== 1));
    return this.productList.filter((x: any) => x.projectName.toLowerCase().indexOf(v.toLowerCase()) !== 1);

  }

  ddlChange(ob: any): void{
    const filterValue = ob.value;
    if(filterValue === 'All'){
      this.productList = this.filterData;
    }else{
      this.productList = this.filterData.filter((prod: any) => prod.category === filterValue);
    }

  }



  // single element charm
  /*
  changer():void{
    if(this.percentile <= 0.10){
      this.color = 'warn';
    }
    else if(this.percentile > 0.10 && this.percentile < 0.50){
      this.color = 'accent';
    }else if(this.percentile >= 0.50 && this.percentile < 0.99){
      this.color = 'primary';
    }else if(this.percentile === 1){
      this.color = 'basic';
    }
  }

  payBills(value: number, amount: number):void{
    let valeur = (value * amount).toString();
    render({
      id:"#myPaymentButtons",
      currency: "USD",
      value: valeur,
      onApprove: (details) => {
        console.log(details);
        alert("Transaction Successfull");
      }
    })
  }

  fav(){
    this.favorite = !this.favorite;
    this.percentile = this.percentile + 0.09;
    if(this.favorite === false){
      this.likes = this.likes - 1;
    }else if(this.favorite === true){
      this.likes = this.likes + 1;
    }
  }
  openDialog(action: string, obj:any, id:any): void{
    obj.action = action;
    obj.inId = id;
    const dialogRef = this.dialog.open(ProductDialogContent,{
      data: obj,
      disableClose: true,
    })
  }
  */

 }

