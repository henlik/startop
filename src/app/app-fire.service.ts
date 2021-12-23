import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AppFireService {
  lat: any;
  lng: any;
  constructor(private _db: AngularFirestore) {}

  getDoc(id: string, province: string){
    return this._db.collection(province).doc(id).valueChanges();
  }

  getDocList(province: string){
    return this._db.collection(province).snapshotChanges();
  }

  createDoc(geo:unknown, province: string){
    return new Promise<any>((resolve, reject)=>{
      this._db.collection(province)
      .add(geo)
      .then(response =>{
        console.log(response)
      }, error => reject(error));
    });
  }

  updateDoc(id: string | undefined,geo: any,  province: string){
    return this._db.collection(province)
    .doc(id).update(geo);
  }

  deleteDoc(geo: string | undefined, province: string){
    return this._db.collection(province)
    .doc(geo).delete();
  }

  webOtp(){
    let string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let OTP = "";

    // Find the length of string
    let len = string.length;
    for (let i = 0; i < 4; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  UssdOtp(){
    let string = "0123456789";
    let OTP = "";

    // Find the length of string
    let len = string.length;
    for (let i = 0; i < 4; i++ ) {
        OTP += string[Math.floor(Math.random() * len)];
    }
    return OTP;
  }

  getSongolo(){
    return "3333030003333333";
  }
  getPakala(){
    return "2222020002222222";
  }

  getWhere(collection:string,field: string, value: any){
    return this._db.collection(collection, ref =>ref.where(field, '==',value)).snapshotChanges();
  }

  getLocation(): void {
    // get Users current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
       this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
  }

}
