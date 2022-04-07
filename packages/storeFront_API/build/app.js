"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var config_1 = require("./config");
var middleware_1 = require("./middleware");
exports.app = (0, express_1.default)();
exports.app.use(middleware_1.middleWare);
exports.app.get("/", function (_, res) {
    config_1.logger.info("base hello world route hit");
    res.send("hello world!");
});
exports.app.use("/products", routes_1.productsRouter);
exports.app.use("/users", routes_1.usersRouter);
exports.app.use("/orders", routes_1.ordersRouter);
