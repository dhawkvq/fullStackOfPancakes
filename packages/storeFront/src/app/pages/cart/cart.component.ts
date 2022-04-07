import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/types/CartItem';
import { ShoppingCartService } from 'src/app/services';
import { Classes } from 'src/types/Classes';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  cartTotal: number = 0;
  currentClasses: Classes = {};

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    this.calculateTotal();
  }

  calculateTotal() {
    this.cartTotal = +this.cartItems
      .reduce((acc, val) => acc + val.price * val.quantity, 0)
      .toFixed(2);
  }

  removeFromCart(id: number) {
    this.cartService.removeItemFromCart(id);
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    this.calculateTotal();
  }

  updateItem($event: Pick<CartItem, 'id' | 'quantity'>) {
    const { id, quantity } = $event;
    this.cartService.updateCartItem(id, quantity);
    this.cartService.getCartItems().subscribe((items) => {
      this.cartItems = items;
    });
    this.calculateTotal();
  }
}
