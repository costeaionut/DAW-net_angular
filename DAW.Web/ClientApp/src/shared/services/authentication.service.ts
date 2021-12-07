import { Inject, Injectable } from '@angular/core';
import { UserForRegistrationDto } from '../interfaces/user/userForRegistrationDto';
import { RegistrationResponseDto } from '../interfaces/response/registrationResponseDto';
import { HttpClient } from '@angular/common/http';
import { UserForLoginDto } from '../interfaces/user/userForLoginDto';
import { LoginResponseDto } from '../interfaces/response/loginResponseDto';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserInfo } from '../interfaces/user/userInfo';
import { User } from 'oidc-client';

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

  public getCurrentUser() {
    return this.http.get<UserInfo>(this.baseUrl + "api/Auth/GetCurrentUser");
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

  public getUserById(userId: string) {
    return this.http.get<UserInfo>(this.baseUrl + "api/Auth/GetUserById/" + userId);
  }

  public logout() {
    localStorage.removeItem("jwt");
    this.sendLoginStateNotification(false);
  }

}
