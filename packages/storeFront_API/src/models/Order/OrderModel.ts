import { pgDb } from "../../DB";
import { Order, OrderItem, OrderStatus } from "../../types";

class OrderModel {
  async getOrderById(
    orderId: number,
    orderStatus: OrderStatus = OrderStatus.ACTIVE
  ): Promise<Order> {
    try {
      const res = await pgDb.query(
        `
        SELECT orders.status,orders.id,orders.user_id, order_items.product_id,order_items.quantity 
        FROM orders
        LEFT JOIN order_items ON order_items.order_id = orders.id
        WHERE orders.id = $1
        ${orderStatus === OrderStatus.ALL ? "" : "AND orders.status = $2"}
      `,
        [orderId, orderStatus]
      );
      if (res.rows.length > 0) {
        const { id, status, user_id, product_id } = res.rows[0];
        return {
          id,
          status,
          user_id,
          order_items: product_id
            ? res.rows.map((item: OrderItem) => ({
                product_id: item.product_id,
                quantity: item.quantity,
              }))
            : undefined,
        };
      }
      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to grab order by id. ${error}`);
    }
  }

  async getOrderItemById(
    orderId: number,
    productId: number
  ): Promise<OrderItem> {
    try {
      const res = await pgDb.query(
        `
        SELECT * FROM order_items
        WHERE order_id = $1
        AND product_id = $2
      `,
        [orderId, productId]
      );
      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to grab order item. ${error}`);
    }
  }

  async getOrderByUserId(userId: number): Promise<Order> {
    try {
      const res = await pgDb.query(
        `
        SELECT orders.status,orders.id,orders.user_id, order_items.product_id,order_items.quantity 
        FROM orders
        LEFT JOIN order_items ON order_items.order_id = orders.id
        WHERE orders.user_id = $1
        AND orders.status = 'active';
      `,
        [userId]
      );
      if (res.rows.length > 0) {
        const { id, product_id } = res.rows[0];
        return {
          id,
          status: OrderStatus.ACTIVE,
          user_id: userId,
          order_items: product_id
            ? res.rows.map((item: OrderItem) => ({
                product_id: item.product_id,
                quantity: item.quantity,
              }))
            : undefined,
        };
      }
      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to get order by id. ${error}`);
    }
  }

  async createOrder(userId: number): Promise<Order["id"]> {
    try {
      const existingOrder = await getOrderByUserId(userId);
      if (existingOrder) return existingOrder.id;
      const res = await pgDb.query(
        `
        INSERT INTO orders(user_id) 
        VALUES($1) 
        RETURNING orders.id
        `,
        [userId]
      );
      return res.rows[0].id;
    } catch (error) {
      throw new Error(`failed to create order. ${error}`);
    }
  }

  async completeOrder(orderId: number): Promise<void> {
    try {
      await pgDb.query(
        `
        UPDATE orders 
        SET status = 'complete' 
        WHERE id = $1`,
        [orderId]
      );
    } catch (error) {
      throw new Error(`failed to complete order. ${error}`);
    }
  }

  async updateOrderItem(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<OrderItem> {
    try {
      const res = await pgDb.query(
        `
        UPDATE order_items
        SET quantity = $1
        WHERE order_id = $2
        AND product_id = $3
        RETURNING *
      `,
        [quantity, orderId, productId]
      );
      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to update order product. ${error}`);
    }
  }
  /**
   * @param quantity - defaults to 1
   */
  async addProductToCart(
    userId: number,
    productId: number,
    quantity = 1
  ): Promise<OrderItem> {
    try {
      const orderId = await createOrder(userId);
      const currentCartItem = await getOrderItemById(orderId, productId);
      if (currentCartItem) {
        return this.updateOrderItem(orderId, productId, quantity);
      }
      const res = await pgDb.query(
        `
        INSERT into order_items(order_id,product_id,quantity)
        VALUES($1,$2,$3)
        RETURNING *
      `,
        [orderId, productId, quantity]
      );

      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to add product to cart. ${error}`);
    }
  }

  async deleteOrder(orderId: number): Promise<number> {
    try {
      await pgDb.query(
        `
       DELETE FROM orders WHERE id = $1;
      `,
        [orderId]
      );
      return orderId;
    } catch (error) {
      throw new Error(`failed to delete order. ${error}`);
    }
  }
}

export const {
  getOrderById,
  getOrderItemById,
  getOrderByUserId,
  createOrder,
  completeOrder,
  addProductToCart,
  updateOrderItem,
  deleteOrder,
} = new OrderModel();
