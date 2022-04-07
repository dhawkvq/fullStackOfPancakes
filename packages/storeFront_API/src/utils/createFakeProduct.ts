import faker from "faker";
import { addProduct } from "../models";
import { Product } from "../types";

export function createFakeProduct(): Promise<Product> {
  return addProduct(faker.commerce.productName(), +faker.commerce.price());
}
