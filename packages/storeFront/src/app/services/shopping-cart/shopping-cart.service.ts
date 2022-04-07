import { Injectable } from '@angular/core';
import { CartItem } from 'src/types/CartItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  items: CartItem[] = [];

  constructor() {}

  getCartItems() {
    return new Observable<CartItem[]>((subscriber) =>
      subscriber.next(this.items)
    );
  }

  addItemToCart(item: CartItem) {
    const currentItemIndex = this.items.findIndex(
      (cartItem) => cartItem.id === item.id
    );
    if (currentItemIndex !== -1) {
      this.items[currentItemIndex].quantity += item.quantity;
    } else {
      this.items.push(item);
    }
  }

  updateCartItem(itemId: number, quantity: number) {
    const currentItemIndex = this.items.findIndex(
      (cartItem) => cartItem.id === itemId
    );
    if (currentItemIndex !== -1) {
      this.items[currentItemIndex].quantity = quantity;
    }
  }

  removeItemFromCart(itemId: number) {
    this.items = this.items.filter((item) => item.id !== itemId);
  }
}
