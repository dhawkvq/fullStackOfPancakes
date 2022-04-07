import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/types/Product';
import { fakeProduct } from 'src/utils/fakeProduct';
import { ShoppingCartService } from 'src/app/services';
import { IconOptions } from '../icon-button/icon-button.component';
import { Classes } from 'src/types/Classes';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product = fakeProduct;

  iconOption: IconOptions = IconOptions.ADD;

  quantity: number = 1;

  currentClasses: Classes = {};

  lightIcon = false;

  constructor(private cartService: ShoppingCartService) {}

  ngOnInit(): void {}

  setQuantity(event: any) {
    this.quantity = +event.target?.value ?? 1;
  }

  addProductToCart() {
    this.updateClasses({ productAddedToCart: true });
    this.cartService.addItemToCart({
      ...this.product,
      quantity: this.quantity,
    });
    this.quantity = 1;
  }

  updateClasses(classes: Classes = {}) {
    this.currentClasses = classes;
    const keys = Object.keys(classes);
    if (!!keys.length) {
      setTimeout(() => {
        this.updateClasses();
      }, 1000);
    }
  }
}
