import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewOrder } from '../../shared/interfaces/orders/newOrder';
import { Painting } from '../../shared/interfaces/paintings/painting';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CartService } from '../../shared/services/cart.service';
import { OrderService } from '../../shared/services/order.service';
import { ShortDescriptionPipe } from '../short-description.pipe';

@Component({
  selector: 'app-order-display',
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})
export class OrderDisplayComponent implements OnInit {

  private currentUser: UserInfo | undefined;
  private orderPaintings: Painting[] | undefined;
  public totalPrice: number;

  constructor(
    private cart: CartService,
    private userService: AuthenticationService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res
    }, err => console.error(err))

    this.orderPaintings = this.cart.getItem();

    this.calculateTotalPrice();

  }

  public isPageLoaded() {
    return this.orderPaintings && this.currentUser && this.orderPaintings.length != 0;
  }

  public calculateTotalPrice() {
    this.totalPrice = 0
    for (let paint of this.orderPaintings) {
      this.totalPrice = this.totalPrice + paint.price
    }
  }

  public buyItems() {

    const order: NewOrder = {
      userId: this.currentUser.id,
      date: new Date(),
      totalPrice: this.totalPrice,
      orderedPaintings: this.orderPaintings
    }

    this.orderService.createOrder(order).subscribe(_ => {
      console.log("Order was placed with ID:" + _.id);
      this.cart.clearItems();
      this.router.navigate(['/listing'])
    })

  }

}
