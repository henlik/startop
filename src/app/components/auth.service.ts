import { Injectable, NgZone } from '@angular/core';
import { User } from "./user";
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map, take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

export type CreateUserRequest = {displayName: string, password: string, email: string, role: string};
export type UpdateUserRequest = {uid: string} & CreateUserRequest;

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl = 'https://us-central1-ume-functions.cloudfunctions.net/api/users'
  userData: any; // Save logged in user data
  _BS = new BehaviorSubject({title:'', user:{}});
  public loading: boolean = false;

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private http: HttpClient,
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning,
    public toastr: ToastrService,
    private _db: AngularFirestore,
  ) {
    /* Saving user data in localstorage when
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user') as string);
      } else {
        localStorage.setItem('user', JSON.stringify(null));
        JSON.parse(localStorage.getItem('user') as string);
      }
    })
  }

  // Sign in with email/password
  SignIn(email: any, password: any) {
    this.loading = true;
     this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        this.SetUserData(result.user);
        if(this.isLoggedIn){
          this.ngZone.run(() => {
            this.router.navigate(['/dashboard']);
            this.toastr.success('Welcome to Startapp');
            this.loading = false;
          });
          // console.log(this.isLoggedIn);
        }
        // else{
        //   this.loading = false;
        //   this.toastr.error('You need to verify your email address');
        // }
      }).catch((error: { message: any; }) => {
        // window.alert(error.message)
        this.loading = false;
        this.toastr.error(error.message);
      })
      console.log(this.isLoggedIn);
  }

  // Sign up with email/password
  SignUp(email: any, password: any, confirm: any) {
    this.loading = true;
    if(password == confirm){
      return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result: { user: any; }) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.router.navigate(['/login']);
        this.toastr.success('We have set you a link to verify your email address');

        // this.SetUserData(result.user);

      }).catch((error: { message: any; }) => {
        this.toastr.error(error.message);
      })
    }else{
      this.toastr.error('Please Confirm your password');
    }
    this.loading = false;

  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser.then(u => u?.sendEmailVerification())
    .then(() => {
      this.router.navigate(['/login']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: any) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Veillez vérifier votre mail, nous vous avons envoyez un lien.');
    }).catch((error: any) => {
      window.alert(error)
    })
  }

  // Returns true when user is looged in and email is verified, more security here
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user') as string);
    return (user !== null && user.emailVerified !== false) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: firebase.auth.GoogleAuthProvider) {
    return this.afAuth.signInWithPopup(provider)
    .then((result: { user: any; }) => {
       this.ngZone.run(() => {
          this.router.navigate(['/dashboard']);
        })
      this.SetUserData(result.user);
    }).catch((error: any) => {
      window.alert(error)
    })
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: { uid: any; email: any; displayName: any; photoURL: any; emailVerified: boolean; role: any; address: any; phoneNumber: any; dob: any;  }) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      role: user.role,
      address: user.address,
      phoneNumber: user.phoneNumber,
      dob: user.dob,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // update user
updateUser(displayName: string,address: string, phoneNumber: string, dob: Date, uid: any ){
  this.loading = true;
  this.afs.collection('users').doc(uid).update({
    displayName: displayName,
    address: address,
    phoneNumber: phoneNumber,
    dob: dob
  }).then(() =>{
    this.SignOut();
  }).catch((error) =>{
    console.log(error);
  });
  this.loading = false;
}

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  // get the all users from db
  get users$(): Observable<User[]> {
    return this.http.get<{users: User[]}>(`${this.baseUrl}`).pipe(
      map(result =>{
        return result.users;
      })
    );
  }

  // get single user
  user$(id: string): Observable<User>{
    return this.http.get<{user: User}>(`${this.baseUrl}/${id}`).pipe(
      map(result =>{
        return result.user;
      })
    );
  }

  // create single user
  create$(user: CreateUserRequest){
    return this.http.post(`${this.baseUrl}`, user).pipe(
      map(_ => {})
    );
  }

  // edit single user
  edit$(user: UpdateUserRequest){
    return this.http.patch(`${this.baseUrl}/${user.uid}`, user).pipe(
      map(_ => {})
    );
  }

  /* userFormService */
  // edit
  edit(user: any){
    this._BS.next({title: 'Edit User', user});
  }
  // create
  create(){
    this._BS.next({title: 'Create User', user: {}});
  }

  // get the title
  get title(){
    return this._BS.asObservable().pipe(
      map(uf => uf.title)
    );
  }

  // get the user
  get user(){
    return this._BS.asObservable().pipe(
      map(uf => uf.user)
    );
  }


  // database interactions
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

  getWhere(collection:string,field: string, value: any){
    return this._db.collection(collection, ref =>ref.where(field, '==',value)).snapshotChanges();
  }
  getWhereOnce(collection:string,field: string, value: any){
    return this._db.collection(collection, ref =>ref.where(field, '==',value)).valueChanges().pipe();
  }
  // allWhere(conditions: Array<any>){
  //   let condition;
  //   for(let cond of conditions){
  //     condition = (cond.collection, ref=>ref.where(cond.field, '==', cond.value))

  //   }


  // }


}
