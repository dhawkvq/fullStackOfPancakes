import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CartComponent,
  CheckoutComponent,
  ProductsComponent,
  ProductDetailComponent,
  ConfirmationComponent,
} from './pages';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
