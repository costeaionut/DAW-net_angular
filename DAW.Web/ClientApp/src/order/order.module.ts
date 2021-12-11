import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDisplayComponent } from './order-display/order-display.component';
import { ShortDescriptionPipe } from './short-description.pipe';



@NgModule({
  declarations: [OrderDisplayComponent, ShortDescriptionPipe],
  imports: [
    CommonModule
  ],
  exports: [OrderDisplayComponent]
})
export class OrderModule { }
