import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BuyerGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate() {
    const jwt = localStorage.getItem('jwt');

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    if (decodedJwtData["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] == "Buyer")
      return true

    this.router.navigate(['/'])
    return false

  }
  
}
