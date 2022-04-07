"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeProduct = void 0;
var faker_1 = __importDefault(require("faker"));
var models_1 = require("../models");
function createFakeProduct() {
    return (0, models_1.addProduct)(faker_1.default.commerce.productName(), +faker_1.default.commerce.price());
}
exports.createFakeProduct = createFakeProduct;
