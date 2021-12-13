import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { RouterModule } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { RegisterComponent } from '../auth/register/register.component';
import { LoginComponent } from '../auth/login/login.component';
import { PaintingModule } from '../painting/painting.module';
import { ListingComponent } from '../painting/listing/listing.component';
import { PaintingDetailComponent } from '../painting/painting-detail/painting-detail.component';
import { PaintingCreateComponent } from '../painting/painting-create/painting-create.component';
import { OrderModule } from '../order/order.module';
import { OrderDisplayComponent } from '../order/order-display/order-display.component';
import { BuyerGuard } from './buyer.guard';
import { UserAddressComponent } from '../auth/user-address/user-address.component';
import { UserAddressFormComponent } from '../auth/user-address-form/user-address-form.component';

export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AuthModule,
    PaintingModule,
    OrderModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full'},
      { path: 'counter', component: CounterComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'listing', component: ListingComponent },
      { path: 'create', component: PaintingCreateComponent },
      { path: 'painting-detail/:paintingId', component: PaintingDetailComponent },
      { path: 'display-cart', component: OrderDisplayComponent, canActivate: [BuyerGuard] },
      { path: 'address', component: UserAddressComponent },
      { path: 'create-address', component: UserAddressFormComponent }
    ]),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:44397"],
        blacklistedRoutes: []
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
