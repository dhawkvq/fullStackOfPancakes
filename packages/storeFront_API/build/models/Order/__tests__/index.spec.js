"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../../../types");
var createFakeOrder_1 = require("../../../utils/createFakeOrder");
var createFakeProduct_1 = require("../../../utils/createFakeProduct");
var createFakeUser_1 = require("../../../utils/createFakeUser");
var OrderModel_1 = require("../OrderModel");
describe("models/Order/OrderModel", function () {
    describe("getOrderById", function () {
        it("returns no info", function () { return __awaiter(void 0, void 0, void 0, function () {
            var undefinedOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, OrderModel_1.getOrderById)(1000)];
                    case 1:
                        undefinedOrder = _a.sent();
                        expect(undefinedOrder).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns an order of type Order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, newOrderId, newOrder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        newOrderId = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.getOrderById)(newOrderId)];
                    case 3:
                        newOrder = _a.sent();
                        expect(newOrder.id).toBeInstanceOf(Number);
                        expect(newOrder.status).toBe(types_1.OrderStatus.ACTIVE);
                        expect(newOrder.user_id).toBe(user.id);
                        expect(newOrder.order_items).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getOrderByUserId", function () {
        it("returns an order that belongs to the passed user id", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, orderId, order;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        orderId = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.getOrderByUserId)(user.id)];
                    case 3:
                        order = _a.sent();
                        expect(order.id).toBe(orderId);
                        expect(order.user_id).toBe(user.id);
                        expect(order.order_items).toBe(undefined);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("getOrderItemById", function () {
        it("returns an order item from a users cart", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, orderId, newProduct, orderItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        orderId = _a.sent();
                        return [4 /*yield*/, (0, createFakeProduct_1.createFakeProduct)()];
                    case 3:
                        newProduct = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.addProductToCart)(user.id, newProduct.id)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.getOrderItemById)(orderId, newProduct.id)];
                    case 5:
                        orderItem = _a.sent();
                        expect(orderItem.order_id).toBe(orderId);
                        expect(orderItem.quantity).toBe(1);
                        expect(orderItem.product_id).toBe(newProduct.id);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("createOrder", function () {
        it("returns a new order and returns the order number", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, newOrderId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        newOrderId = _a.sent();
                        expect(newOrderId).toBeInstanceOf(Number);
                        return [2 /*return*/];
                }
            });
        }); });
        it("returns existing order if order is still active", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, newOrderId, existingOrderId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        newOrderId = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 3:
                        existingOrderId = _a.sent();
                        expect(existingOrderId).toBe(newOrderId);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("completeOrder", function () {
        it("will return a new order if existing order is set to complete", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, newOrderId, anotherNewOrderId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        newOrderId = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.completeOrder)(newOrderId)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 4:
                        anotherNewOrderId = _a.sent();
                        expect(newOrderId).not.toBe(anotherNewOrderId);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("updateOrderItem", function () {
        it("returns an updated order item", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, order, orderItem, updatedOrderItem;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, (0, createFakeOrder_1.createFakeOrder)(user.id)];
                    case 2:
                        order = _b.sent();
                        orderItem = (_a = order.order_items) === null || _a === void 0 ? void 0 : _a[0];
                        expect(orderItem).toBeTruthy();
                        if (!orderItem) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, OrderModel_1.updateOrderItem)(order.id, orderItem.product_id, orderItem.quantity + 1)];
                    case 3:
                        updatedOrderItem = _b.sent();
                        expect(updatedOrderItem.quantity).toBe(orderItem.quantity + 1);
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    });
    describe("addProductToCart", function () {
        it("returns a newly added CartItem", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newProduct, user, orderItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeProduct_1.createFakeProduct)()];
                    case 1:
                        newProduct = _a.sent();
                        return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.addProductToCart)(user.id, newProduct.id, 2)];
                    case 3:
                        orderItem = _a.sent();
                        expect(orderItem.id).toBeInstanceOf(Number);
                        expect(orderItem.product_id).toBeInstanceOf(Number);
                        expect(orderItem.product_id).toBe(newProduct.id);
                        expect(orderItem.quantity).toBeInstanceOf(Number);
                        expect(orderItem.quantity).toBe(2);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("deleteOrder", function () {
        it("deleted an order", function () { return __awaiter(void 0, void 0, void 0, function () {
            var user, newOrderId, deletedOrderId, noOrderFound;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.createOrder)(user.id)];
                    case 2:
                        newOrderId = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.deleteOrder)(newOrderId)];
                    case 3:
                        deletedOrderId = _a.sent();
                        return [4 /*yield*/, (0, OrderModel_1.getOrderById)(deletedOrderId)];
                    case 4:
                        noOrderFound = _a.sent();
                        expect(deletedOrderId).toBeInstanceOf(Number);
                        expect(noOrderFound).toBeFalsy();
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
