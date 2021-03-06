import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../components/auth.service";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn === true) {
      return true;
    }else{
      this.router.navigate(['login'])
      return false;
    }
    }

}

// export class RevokeGuard implements CanActivate {

//   constructor(
//     public authService: AuthService,
//     public router: Router
//   ){ }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//     if(this.authService.isLoggedIn !== true) {
//       return true;
//     }else{
//       this.router.navigate(['dashboard'])
//       return false;
//     }
//     }

// }
