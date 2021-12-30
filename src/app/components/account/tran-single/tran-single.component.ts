import { Component, NgZone, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { isArray, isObject } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-tran-single',
  templateUrl: './tran-single.component.html',
  styleUrls: ['./tran-single.component.scss']
})
export class TranSingleComponent implements OnInit {
    id: any;
    user: any;
    tranSingle: any;
    payment!: object[];
    displayPayment: string[] = ['paymentId','itemName', 'unitPrice','unit','total'];
  constructor(public afs: AngularFirestore, activatedRouter: ActivatedRoute, public dialog: MatDialog, public umeService:AuthService, public fb: FormBuilder, public toastr: ToastrService,public router: Router,
    public ngZone: NgZone) {
      this.id = activatedRouter?.snapshot?.paramMap?.get('id');
      this.user = JSON.parse(localStorage.getItem('user') as string);

      this.umeService.getDoc(this.id, 'transaction').subscribe(data => {
        this.tranSingle = data;

        console.log(typeof this.tranSingle);
        // this.tranSingle.payment.map((paid: any)=>{
        //   console.log(paid);
        // });

          this.payment = this.tranSingle.payment
          console.log(this.payment);

      })
     }

  ngOnInit(): void {
  }

}
