import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RevokeGuard implements CanActivate {
  constructor(public authService: AuthService,
    public router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.authService.isLoggedIn !== true) {
        return true;
      }else{
        this.router.navigate(['dashboard'])
        return false;
      }
  }

}
