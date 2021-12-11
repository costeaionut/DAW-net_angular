import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing/listing.component';
import { PaintingTileComponent } from './painting-tile/painting-tile.component';
import { PaintingDetailComponent } from './painting-detail/painting-detail.component';
import { PaintingCreateComponent } from './painting-create/painting-create.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ListingComponent, PaintingTileComponent, PaintingDetailComponent, PaintingCreateComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [ListingComponent]
})
export class PaintingModule { }
