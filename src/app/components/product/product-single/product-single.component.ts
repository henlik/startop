import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';
import{render} from 'creditcardpayments/creditCardPayments';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { T } from '@angular/cdk/keycodes';
import { async } from 'rxjs';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss']
})
export class ProductSingleComponent implements OnInit {
  favorite:boolean = false;
  likes:number = 0;
  shares: number = 12;
  share: boolean = false;
  color: string = 'basic';
  percentile: number = 0;
  user: any;
  // price: number = 100;
  productList: any;
  selectedCategory = 'All';
  filterData: any;
  id: any;
  purchased: any;
  reminder: any;
  transCheck: any;

  // merging elements
  payment: any;
  itemCostTrack: any;
  itemQuantityTrack:any;
  itemPriceTrack: any;
  itemCost: any;
  itemQuantity:any;
  itemPrice: any;
  transId: any;

  constructor(public afs: AngularFirestore, activatedRouter: ActivatedRoute, public dialog: MatDialog, public umeService:AuthService, public fb: FormBuilder, public toastr: ToastrService,public router: Router,
    public ngZone: NgZone) {
      // debugger;
      this.id = activatedRouter?.snapshot?.paramMap?.get('id');
      this.user = JSON.parse(localStorage.getItem('user') as string);
      this.umeService.getDoc(this.id, 'pitchRequest').subscribe(data => {
        this.productList = data;
        if(this.productList.purchased === ''){
          this.reminder = parseFloat(this.productList.shares);
        }else{
          this.reminder = parseFloat(this.productList.shares) - parseFloat(this.productList.purchased);
        }

      })
     }

  ngOnInit(): void {
  }
  payBills(value: any, amount: any,projectName: string, companyName: string, companyId: string, shortDescription:string, category: string):void{
    let valeur = (parseFloat(value) * parseFloat(amount)).toString();
    render({
      id:"#myPaymentButtons",
      currency: "USD",
      value: valeur,
      onApprove: (details) => {
        // for that user
            // first time for the user to purchase
            this.umeService.createDoc({
              payment: details,
              createdBy: this.user.uid,
              createdAt: new Date(),
              itemId: this.id,
              pitchId: this.productList.requestId,
              itemQuantity: value,
              itemPrice: amount,
              itemCost: valeur,
              projectName: projectName,
              category: category,
              companyName: companyName,
              companyId: companyId,
              shortDescription: shortDescription,
            }, 'transaction');
            // update the transaction document


        if(this.productList.purchased === ''){
          this.purchased = parseFloat(value);
        }else{
          this.purchased = parseFloat(this.productList.purchased) + parseFloat(value);
        }
        this.umeService.updateDoc(this.id,{
          purchased: this.purchased,
        },'pitchRequest').then(() =>{
          // console.log(details);
        });
        // bill page next time
        this.router.navigate(['/component/account/tranSingle',this.id]);
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

}
