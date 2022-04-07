import { OrderStatus } from "../../../types";
import { createFakeOrder } from "../../../utils/createFakeOrder";
import { createFakeProduct } from "../../../utils/createFakeProduct";
import { createFakeUser } from "../../../utils/createFakeUser";
import {
  getOrderById,
  createOrder,
  completeOrder,
  addProductToCart,
  deleteOrder,
  getOrderItemById,
  getOrderByUserId,
  updateOrderItem,
} from "../OrderModel";

describe("models/Order/OrderModel", () => {
  describe("getOrderById", () => {
    it("returns no info", async () => {
      const undefinedOrder = await getOrderById(1000);
      expect(undefinedOrder).toBeFalsy();
    });

    it("returns an order of type Order", async () => {
      const user = await createFakeUser();
      const newOrderId = await createOrder(user.id);
      const newOrder = await getOrderById(newOrderId);
      expect(newOrder.id).toBeInstanceOf(Number);
      expect(newOrder.status).toBe(OrderStatus.ACTIVE);
      expect(newOrder.user_id).toBe(user.id);
      expect(newOrder.order_items).toBeFalsy();
    });
  });

  describe("getOrderByUserId", () => {
    it("returns an order that belongs to the passed user id", async () => {
      const user = await createFakeUser();
      const orderId = await createOrder(user.id);
      const order = await getOrderByUserId(user.id);
      expect(order.id).toBe(orderId);
      expect(order.user_id).toBe(user.id);
      expect(order.order_items).toBe(undefined);
    });
  });

  describe("getOrderItemById", () => {
    it("returns an order item from a users cart", async () => {
      const user = await createFakeUser();
      const orderId = await createOrder(user.id);
      const newProduct = await createFakeProduct();
      await addProductToCart(user.id, newProduct.id);
      const orderItem = await getOrderItemById(orderId, newProduct.id);
      expect(orderItem.order_id).toBe(orderId);
      expect(orderItem.quantity).toBe(1);
      expect(orderItem.product_id).toBe(newProduct.id);
    });
  });

  describe("createOrder", () => {
    it("returns a new order and returns the order number", async () => {
      const user = await createFakeUser();
      const newOrderId = await createOrder(user.id);
      expect(newOrderId).toBeInstanceOf(Number);
    });

    it("returns existing order if order is still active", async () => {
      const user = await createFakeUser();
      const newOrderId = await createOrder(user.id);
      const existingOrderId = await createOrder(user.id);
      expect(existingOrderId).toBe(newOrderId);
    });
  });

  describe("completeOrder", () => {
    it("will return a new order if existing order is set to complete", async () => {
      const user = await createFakeUser();
      const newOrderId = await createOrder(user.id);
      await completeOrder(newOrderId);
      const anotherNewOrderId = await createOrder(user.id);
      expect(newOrderId).not.toBe(anotherNewOrderId);
    });
  });

  describe("updateOrderItem", () => {
    it("returns an updated order item", async () => {
      const user = await createFakeUser();
      const order = await createFakeOrder(user.id);
      const orderItem = order.order_items?.[0];
      expect(orderItem).toBeTruthy();
      if (orderItem) {
        const updatedOrderItem = await updateOrderItem(
          order.id,
          orderItem.product_id,
          orderItem.quantity + 1
        );
        expect(updatedOrderItem.quantity).toBe(orderItem.quantity + 1);
      }
    });
  });

  describe("addProductToCart", () => {
    it("returns a newly added CartItem", async () => {
      const newProduct = await createFakeProduct();
      const user = await createFakeUser();
      const orderItem = await addProductToCart(user.id, newProduct.id, 2);
      expect(orderItem.id).toBeInstanceOf(Number);
      expect(orderItem.product_id).toBeInstanceOf(Number);
      expect(orderItem.product_id).toBe(newProduct.id);
      expect(orderItem.quantity).toBeInstanceOf(Number);
      expect(orderItem.quantity).toBe(2);
    });
  });

  describe("deleteOrder", () => {
    it("deleted an order", async () => {
      const user = await createFakeUser();
      const newOrderId = await createOrder(user.id);
      const deletedOrderId = await deleteOrder(newOrderId);
      const noOrderFound = await getOrderById(deletedOrderId);
      expect(deletedOrderId).toBeInstanceOf(Number);
      expect(noOrderFound).toBeFalsy();
    });
  });
});
