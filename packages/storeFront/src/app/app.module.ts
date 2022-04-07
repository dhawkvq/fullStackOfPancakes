import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NavBarComponent,
  ProductComponent,
  CartItemComponent,
  PlusIconComponent,
  IconButtonComponent,
  UserCheckoutFormComponent,
} from './components';
import {
  ProductsComponent,
  ProductDetailComponent,
  CartComponent,
} from './pages';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailComponent,
    CartComponent,
    CartItemComponent,
    PlusIconComponent,
    IconButtonComponent,
    UserCheckoutFormComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
