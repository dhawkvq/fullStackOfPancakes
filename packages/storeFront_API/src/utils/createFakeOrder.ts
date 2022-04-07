import { Order } from "../types";
import {
  addProductToCart,
  createOrder,
  getOrderById,
} from "../models/Order/OrderModel";
import { createFakeProduct } from "./createFakeProduct";

export async function createFakeOrder(userId: number): Promise<Order> {
  const fakeOrderId = await createOrder(userId);
  const newProduct = await createFakeProduct();
  const anotherNewProduct = await createFakeProduct();
  await addProductToCart(userId, newProduct.id);
  await addProductToCart(userId, anotherNewProduct.id);
  return getOrderById(fakeOrderId);
}
