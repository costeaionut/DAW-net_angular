import { UserForLoginDto } from './../../shared/interfaces/user/userForLoginDto';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './../../shared/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public errorMessage: string = '';
  public showError: boolean;
  private _returnUrl: string;

  constructor(private _authService: AuthenticationService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    })

    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public validateControl = (controlName: string) => {
    return this.loginForm.controls[controlName].invalid && this.loginForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName)
  }

  public loginUser(loginFormValue){

    this.showError = false;
    const login = { ...loginFormValue };
 
    const userForLogin: UserForLoginDto = {
      email: login.username,
      password: login.password
    }

    this._authService.loginUser(userForLogin)
      .subscribe(res => {
        localStorage.setItem("jwt", res.token);
        this._authService.sendLoginStateNotification(res.isAuthSuccessful);
        this._router.navigate([this._returnUrl]);
      },
      (error) => {
        this.errorMessage = "Email or Password are incorrect!";
        this.showError = true;
      })
  }

}
