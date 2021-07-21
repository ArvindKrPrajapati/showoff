import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('user')) {
            if(route.url.toString()=="" || route.url.toString()=="signup"){
              this.router.navigate(['/post']);
              return false;
            }
            return true;
        }
        if(route.url.toString()=="" || route.url.toString()=="signup"){
          return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}