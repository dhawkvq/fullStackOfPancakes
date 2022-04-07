import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/types/CartItem';
import { fakeCartItem } from 'src/utils/fakeCartItem';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem = fakeCartItem;
  @Output() removeItemEvent = new EventEmitter<number>();
  @Output() updateItemEvent = new EventEmitter<
    Pick<CartItem, 'id' | 'quantity'>
  >();

  total = 0;

  updatedQuantity = 1;

  constructor() {}

  ngOnInit(): void {
    this.calculateTotal();
    this.updatedQuantity = this.cartItem.quantity;
  }

  calculateTotal() {
    this.total = +(this.cartItem.price * this.cartItem.quantity).toFixed(2);
  }

  removeFromCart() {
    this.removeItemEvent.emit(this.cartItem.id);
  }

  setQuantity(event: any) {
    this.updatedQuantity = +event.target?.value ?? 1;
  }

  updateCartItem() {
    this.updateItemEvent.emit({
      id: this.cartItem.id,
      quantity: this.updatedQuantity,
    });
    this.calculateTotal();
  }
}
