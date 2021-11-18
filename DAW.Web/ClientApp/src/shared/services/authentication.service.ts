import { Inject, Injectable } from '@angular/core';
import { UserForRegistrationDto } from '../interfaces/user/userForRegistrationDto';
import { RegistrationResponseDto } from '../interfaces/response/registrationResponseDto';
import { HttpClient } from '@angular/common/http';
import { UserForLoginDto } from '../interfaces/user/userForLoginDto';
import { LoginResponseDto } from '../interfaces/response/loginResponseDto';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl: string;

  private _authChangeSub = new Subject<boolean>()
  public authChanged = this._authChangeSub.asObservable();

  constructor(
    private http: HttpClient,
    private _jwtHelper: JwtHelperService,
    @Inject('BASE_URL') _baseUrl: string
  ) {
    this.baseUrl = _baseUrl
  }

  public registerUser(body: UserForRegistrationDto) {
    return this.http.post<RegistrationResponseDto>(this.baseUrl + "api/Auth/Register", body);
  }

  public loginUser(body: UserForLoginDto) {
    return this.http.post<LoginResponseDto>(this.baseUrl + "api/Auth/Login", body);
  }

  public isUserAuthenticated(): boolean{
    const token = localStorage.getItem("jwt");

    if (token.length == 0 || this._jwtHelper.isTokenExpired(token))
      return false

    return true
  }

  public sendLoginStateNotification(isAuthenticated) {
    this._authChangeSub.next(isAuthenticated);
  }

  public logout() {
    localStorage.removeItem("jwt");
    this.sendLoginStateNotification(false);
  }

}
