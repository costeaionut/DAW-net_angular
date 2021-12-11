import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorHighlightDirective } from './validator-highlight.directive';

@NgModule({
  declarations: [RegisterComponent, LoginComponent, ValidatorHighlightDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RegisterComponent, LoginComponent]
})
export class AuthModule { }
