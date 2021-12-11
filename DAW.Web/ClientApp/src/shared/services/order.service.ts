import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NewOrder } from '../interfaces/orders/newOrder';
import { Order } from '../interfaces/orders/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') _baseUrl: string
  ) {
    this.baseUrl = _baseUrl
  }

  public createOrder(order: NewOrder) {
    return this.http.post<Order>(this.baseUrl + 'api/Order/CreateOrder', order);
  }

}
