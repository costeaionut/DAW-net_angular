import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { RegisterComponent } from '../auth/register/register.component';
import { UserAddressFormComponent } from '../auth/user-address-form/user-address-form.component';
import { UserAddressComponent } from '../auth/user-address/user-address.component';
import { OrderDisplayComponent } from '../order/order-display/order-display.component';
import { ListingComponent } from '../painting/listing/listing.component';
import { PaintingCreateComponent } from '../painting/painting-create/painting-create.component';
import { PaintingDetailComponent } from '../painting/painting-detail/painting-detail.component';
import { BuyerGuard } from './buyer.guard';
import { CounterComponent } from './counter/counter.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'counter', component: CounterComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listing', component: ListingComponent },
  { path: 'create', component: PaintingCreateComponent },
  { path: 'painting-detail/:paintingId', component: PaintingDetailComponent },
  { path: 'display-cart', component: OrderDisplayComponent, canActivate: [BuyerGuard] },
  { path: 'address', component: UserAddressComponent },
  { path: 'create-address', component: UserAddressFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
