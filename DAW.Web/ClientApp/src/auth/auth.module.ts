import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorHighlightDirective } from './validator-highlight.directive';
import { UserAddressComponent } from './user-address/user-address.component';
import { UserAddressFormComponent } from './user-address-form/user-address-form.component';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ValidatorHighlightDirective, UserAddressComponent, UserAddressFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegisterComponent, LoginComponent, UserAddressComponent, UserAddressFormComponent]
})
export class AuthModule { }
