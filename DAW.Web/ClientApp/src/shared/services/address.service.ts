import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Address } from '../interfaces/user/address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string
  ) {
    this.baseUrl = _baseUrl;
  }

  public addUserAddress(address: Address) {
    return this.http.post<Address>(this.baseUrl + "api/Address/AddAddress", address);
  }

  public getUserAddress(userId: string) {
    return this.http.get<Address>(this.baseUrl + "api/Address/UserAddress/" + userId);
  }

  public deleteUserAddress(address: Address) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: address
    }

    return this.http.delete<boolean>(this.baseUrl + 'api/Address/DeleteAddress', options);

  }

}
