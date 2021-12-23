import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { FormArray, FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { mergeMapTo } from 'rxjs/operators';
import { AppFireService } from 'src/app/app-fire.service';
import { AuthService } from 'src/app/components/auth.service';
// import { Mild } from './mild';

@Component({
  selector: 'app-add-net',
  templateUrl: './add-net.component.html',
  styleUrls: ['./add-net.component.scss']
})
export class AddNetComponent implements OnInit {

  // mild: Mild = new Mild();
  addForm: FormGroup = Object.create(null);
  // rows: FormArray;
  quantity = 0;
  scanResult:Array<string> = [];
  scan: boolean = false;
  delScan: boolean = false;
  lat: any;
  long: any;
  accuracy: any;
  rCheck: string ='';
  mildCounter: number = 0;
  gps: any;
  scanCheck: boolean = false;
  pluriel: string = '';
  userData: any;
  constructor(private afM: AngularFireMessaging, private fb: FormBuilder, private _dbService: AppFireService, private router: Router, public dialog: MatDialog, public auth: AuthService) {
    this.addForm = this.fb.group({});

   }

  ngOnInit(): void {

    this.addsForm();
    this.getDirection();
    if(this.mildCounter > 1){
      this.pluriel = 's';
    }else{
      this.pluriel = '';
    }
    this.userData = JSON.parse(localStorage.getItem('user') as string);
    this.requestPermission();

  }

  addsForm(){
    this.addForm = this.fb.group({
      zs: ['', Validators.required],
    })
  }
  get zs(){
    return this.addForm?.get('zs');
  }

  requestPermission(){
    this.afM.requestPermission
    // .pipe(mergeMapTo(this.afM.tokenChanges))
    .subscribe(
      (token) => { console.log('Permission granted! Save to the serve!', token);},
      (error) => { console.error(error);}
    );

  }

  getLocation(){
    // get Users current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {

          this.lat = position.coords.latitude;
          this.long = position.coords.longitude;
          this.accuracy = position.coords.accuracy;
          this.gps = {lat: this.lat, long: this.long, accuracy: this.accuracy};
          console.log(this.accuracy, this.lat, this.long);

      });
    }
  }
  async getDirection() {

    if (typeof this.lat === "undefined" || typeof this.long === "undefined") {
      await this.getLocation();
    }
    this.gps = { lat: this.lat, lng: this.long };

  }

  scanner(){
    this.scan = !this.scan;
  }
  delScanner(){
    this.delScan = !this.delScan;
  }
  checkScanner(){
    this.scanCheck = !this.scanCheck;
  }

  onCodeResult(result: string){
    // check if the result is in array, do nothing and close with toastr message
    // this.scanResult.forEach((element, index) =>{
      // if(element === result){
      //   // toasrt element in
      //   console.log(true);
      // }else{
        this.scanResult.push(result);
        this.mildCounter = this.mildCounter + 1;
        console.log(this.mildCounter);
      // }
    // })

    this.scan = !this.scan;
    console.log(this.scanResult);
    // this.rCheck = result;
    // if the result do no exist in array, puh the reuslt into the array, exit with success
  }

  onCodeDelete(result: string){
    // check if the result is in array, do nothing and close with toastr message
    // remove the corresponding result from the array
    // ;

    this.scanResult.forEach((element,index)=>{
      if(element == result){
        delete this.scanResult[index];
        this.mildCounter = this.mildCounter - index;
      }
   });
   this.delScan = !this.delScan;
   console.log(this.scanResult);

    // if the result do no exist in array, puh the reuslt into the array, exit with success
  }

  onCodeCheck(result: string){
    this.scanResult.forEach((element, index)=>{
      if(element == result){
        return true
      }else{
        return false;
      }
    })
    this.scanCheck = !this.scanCheck;
  }


  saveDetail(): void{

    console.log(this.gps);
    this._dbService.createDoc({
      zoneSante: this.zs?.value,
      mildNumber: this.mildCounter,
      geoData: this.gps,
      createdAt: Date.now(),
      createdBy: this.userData.uid,
      lotMild: this.scanResult,
    },'lotMild').then(result =>{
       console.log(result);
    }).catch(error =>{
      console.log(error);
    })
   }

}
