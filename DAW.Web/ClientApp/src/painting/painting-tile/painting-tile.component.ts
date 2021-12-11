import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Painting } from '../../shared/interfaces/paintings/painting';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-painting-tile',
  templateUrl: './painting-tile.component.html',
  styleUrls: ['./painting-tile.component.css']
})
export class PaintingTileComponent implements OnInit {

  @Input() painting: Painting;
  private currentUser: UserInfo;

  constructor(private router: Router, private cartService: CartService, private userService: AuthenticationService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    }, err => console.error(err))
  }

  goToDetailsPage(painting: Painting) {
    this.router.navigate(['/painting-detail/' + painting.id])
  }

  addToCart() {
    this.cartService.addItem(this.painting)
    console.log(this.cartService.getItem())
  }
}
