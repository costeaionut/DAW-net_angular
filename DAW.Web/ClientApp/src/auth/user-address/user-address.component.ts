import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Address } from '../../shared/interfaces/user/address';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AddressService } from '../../shared/services/address.service';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css']
})
export class UserAddressComponent implements OnInit {

  currentUser: UserInfo | undefined;
  hasAddressSet: boolean | undefined;
  address: Address | undefined;

  constructor(
    private _addressService: AddressService,
    private _userService: AuthenticationService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._userService.getCurrentUser().subscribe(res => {

      this.currentUser = res;

      if (this.currentUser !== undefined) {

        this._addressService.getUserAddress(this.currentUser.id).subscribe(res => {
          this.address = res;
          this.hasAddressSet = true;

          if (this.address == null)
            this.hasAddressSet = false

        }, err => console.error(err)
        )
      }

    }, err => console.error(err))
  }

  public pageIsLoaded() {
    if (this.hasAddressSet === undefined)
      return false;

    return true
  }

  public deleteAddress() {
    this._addressService.deleteUserAddress(this.address).subscribe(_ => {
      alert("Address was deleted!");
      this._router.navigate(['/'])
    }, err => console.error(err))
  }

  public addAddress() {
    this._router.navigate(['/create-address'])
  }

}
