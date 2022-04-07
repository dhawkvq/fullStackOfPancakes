import { Injectable } from '@angular/core';
import { Product } from 'src/types/Product';
import products from 'src/assets/data.json';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts(): Product[] {
    return products;
  }

  getProductById(id: number): Product {
    return products.find((product: Product) => product.id === id);
  }
}
