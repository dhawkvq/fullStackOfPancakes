import { Router } from "express";
import { allProducts, addProduct, getProductById } from "../models";
import { logger } from "../config";
import { assertString, assertNumber } from "../utils/assert";
import { auth } from "../middleware/auth";

export const productsRouter = Router();

// Get all products
productsRouter.get("/", async (_, res, next) => {
  try {
    const products = await allProducts();
    res.send(products);
  } catch (error) {
    logger.error(`error from fetching all products. ${error}`);
    res.statusCode = 500;
    next(error);
  }
});

// Get Product by id
productsRouter.get("/:productId", async (req, res, next) => {
  const params = req.params;
  try {
    const productId = assertNumber(params.productId);
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    logger.error(`error from fetching all products. ${error}`);
    res.statusCode = 500;
    next(error);
  }
});

// Create product
productsRouter.post("/", auth, async (req, res, next) => {
  try {
    const name = assertString(req.body.name);
    const price = assertNumber(req.body.price);
    const newProduct = await addProduct(name, price);
    res.status(201).send(newProduct);
  } catch (error) {
    logger.error(`error from fetching all products. ${error}`);
    res.statusCode = 400;
    next(error);
  }
});
