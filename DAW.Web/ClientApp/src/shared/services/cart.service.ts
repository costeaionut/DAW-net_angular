import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Painting } from '../interfaces/paintings/painting';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  paintings: Painting[] = []

  constructor() { }

  addItem(painting: Painting) {

    var flag = false

    for (let paint of this.paintings) {
      if (paint === painting) {
        flag = true
      }
    }
    if (flag == true)
      alert("Item is already in cart!")
    else
      this.paintings.push(painting);
  }

  getItem() {
    return this.paintings;
  }

  clearItems() {
    this.paintings = []
    return this.paintings;
  }

}
