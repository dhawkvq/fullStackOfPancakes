import { Router } from "express";
import { addProductToCart, getOrderByUserId } from "../models/Order/OrderModel";
import { assertNumber, assertNumberOptional } from "../utils/assert";
import { logger } from "../config";
import { auth } from "../middleware/auth";

export const ordersRouter = Router();

// Get Order by user id
ordersRouter.get("/:userId", auth, async (req, res, next) => {
  try {
    const userId = assertNumber(req.params.userId);
    const order = await getOrderByUserId(userId);
    res.send(order);
  } catch (error) {
    logger.error(`failed to get order by user id. ${error}`);
    res.statusCode = 500;
    next(error);
  }
});

// Add product to Users cart
ordersRouter.post("/", auth, async (req, res, next) => {
  const body = req.body;

  try {
    const userId = assertNumber(body.userId);
    const productId = assertNumber(body.productId);
    const quantity = assertNumberOptional(body.quantity);

    const orderItem = await addProductToCart(userId, productId, quantity);
    res.send(orderItem);
  } catch (error) {
    logger.error(`failed to add item to order. ${error}`);
    res.statusCode = 500;
    next(error);
  }
});
