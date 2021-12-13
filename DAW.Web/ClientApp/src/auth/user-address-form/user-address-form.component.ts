import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from '../../shared/interfaces/user/address';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AddressService } from '../../shared/services/address.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-user-address-form',
  templateUrl: './user-address-form.component.html',
  styleUrls: ['./user-address-form.component.css']
})
export class UserAddressFormComponent implements OnInit {

  public addressForm: FormGroup
  currentUser: UserInfo;

  constructor(
    private _userService: AuthenticationService,
    private _addressService: AddressService,
    private _router: Router
  ) { }

  ngOnInit() {

    this._userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    }, err => console.error(err))

    this.addressForm = new FormGroup({
      country: new FormControl('', [Validators.required]),
      town: new FormControl('', [Validators.required]),
      streetName: new FormControl('', [Validators.required]),
      streetNumber: new FormControl('', [Validators.required]),
      flat: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required])
    })
  }

  public validateControl = (controlName: string) => {
    return this.addressForm.controls[controlName].invalid && this.addressForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.addressForm.controls[controlName].hasError(errorName)
  }

  public addAddress(formValues) {
    const address: Address = {
      userId: this.currentUser.id,
      country: formValues.country,
      town: formValues.town,
      streetName: formValues.streetName,
      streetNumber: formValues.streetNumber,
      flatNumber: formValues.flat,
      postalCode: formValues.postalCode
    }

    this._addressService.addUserAddress(address).subscribe(_ => {
      alert("Address was added!")
      this._router.navigate(['/address'])
    }, err => console.error(err))

  }

}
