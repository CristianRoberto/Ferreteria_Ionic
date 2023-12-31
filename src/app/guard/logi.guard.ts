import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router  } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogiGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate() {

    if(localStorage.getItem('login') ){
        return true;  
    }else {   
      this.router.navigate(['/']);
      return false; 
    }
  }
}
