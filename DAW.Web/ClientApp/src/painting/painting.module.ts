import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { PaintingTileComponent } from './painting-tile/painting-tile.component';
import { PaintingDetailComponent } from './painting-detail/painting-detail.component';



@NgModule({
  declarations: [ListingComponent, PaintingTileComponent, PaintingDetailComponent],
  imports: [
    CommonModule
  ],
  exports: [ListingComponent]
})
export class PaintingModule { }
