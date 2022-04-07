import express from "express";
import { productsRouter, usersRouter, ordersRouter } from "./routes";
import { logger } from "./config";
import { middleWare } from "./middleware";

export const app = express();

app.use(middleWare);

app.get("/", (_, res) => {
  logger.info("base hello world route hit");
  res.send("hello world!");
});

app.use("/products", productsRouter);

app.use("/users", usersRouter);

app.use("/orders", ordersRouter);
