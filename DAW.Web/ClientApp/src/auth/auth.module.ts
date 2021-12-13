import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorHighlightDirective } from './validator-highlight.directive';
import { UserAddressComponent } from './user-address/user-address.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ValidatorHighlightDirective, UserAddressComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegisterComponent, LoginComponent, UserAddressComponent]
})
export class AuthModule { }
