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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = exports.updateOrderItem = exports.addProductToCart = exports.completeOrder = exports.createOrder = exports.getOrderByUserId = exports.getOrderItemById = exports.getOrderById = void 0;
var DB_1 = require("../../DB");
var types_1 = require("../../types");
var OrderModel = /** @class */ (function () {
    function OrderModel() {
    }
    OrderModel.prototype.getOrderById = function (orderId, orderStatus) {
        if (orderStatus === void 0) { orderStatus = types_1.OrderStatus.ACTIVE; }
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, id, status_1, user_id, product_id, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n        SELECT orders.status,orders.id,orders.user_id, order_items.product_id,order_items.quantity \n        FROM orders\n        LEFT JOIN order_items ON order_items.order_id = orders.id\n        WHERE orders.id = $1\n        ".concat(orderStatus === types_1.OrderStatus.ALL ? "" : "AND orders.status = $2", "\n      "), [orderId, orderStatus])];
                    case 1:
                        res = _b.sent();
                        if (res.rows.length > 0) {
                            _a = res.rows[0], id = _a.id, status_1 = _a.status, user_id = _a.user_id, product_id = _a.product_id;
                            return [2 /*return*/, {
                                    id: id,
                                    status: status_1,
                                    user_id: user_id,
                                    order_items: product_id
                                        ? res.rows.map(function (item) { return ({
                                            product_id: item.product_id,
                                            quantity: item.quantity,
                                        }); })
                                        : undefined,
                                }];
                        }
                        return [2 /*return*/, res.rows[0]];
                    case 2:
                        error_1 = _b.sent();
                        throw new Error("failed to grab order by id. ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.getOrderItemById = function (orderId, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n        SELECT * FROM order_items\n        WHERE order_id = $1\n        AND product_id = $2\n      ", [orderId, productId])];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.rows[0]];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error("failed to grab order item. ".concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.getOrderByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var res, _a, id, product_id, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n        SELECT orders.status,orders.id,orders.user_id, order_items.product_id,order_items.quantity \n        FROM orders\n        LEFT JOIN order_items ON order_items.order_id = orders.id\n        WHERE orders.user_id = $1\n        AND orders.status = 'active';\n      ", [userId])];
                    case 1:
                        res = _b.sent();
                        if (res.rows.length > 0) {
                            _a = res.rows[0], id = _a.id, product_id = _a.product_id;
                            return [2 /*return*/, {
                                    id: id,
                                    status: types_1.OrderStatus.ACTIVE,
                                    user_id: userId,
                                    order_items: product_id
                                        ? res.rows.map(function (item) { return ({
                                            product_id: item.product_id,
                                            quantity: item.quantity,
                                        }); })
                                        : undefined,
                                }];
                        }
                        return [2 /*return*/, res.rows[0]];
                    case 2:
                        error_3 = _b.sent();
                        throw new Error("failed to get order by id. ".concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.createOrder = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var existingOrder, res, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, (0, exports.getOrderByUserId)(userId)];
                    case 1:
                        existingOrder = _a.sent();
                        if (existingOrder)
                            return [2 /*return*/, existingOrder.id];
                        return [4 /*yield*/, DB_1.pgDb.query("\n        INSERT INTO orders(user_id) \n        VALUES($1) \n        RETURNING orders.id\n        ", [userId])];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res.rows[0].id];
                    case 3:
                        error_4 = _a.sent();
                        throw new Error("failed to create order. ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.completeOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n        UPDATE orders \n        SET status = 'complete' \n        WHERE id = $1", [orderId])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("failed to complete order. ".concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.updateOrderItem = function (orderId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n        UPDATE order_items\n        SET quantity = $1\n        WHERE order_id = $2\n        AND product_id = $3\n        RETURNING *\n      ", [quantity, orderId, productId])];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.rows[0]];
                    case 2:
                        error_6 = _a.sent();
                        throw new Error("failed to update order product. ".concat(error_6));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param quantity - defaults to 1
     */
    OrderModel.prototype.addProductToCart = function (userId, productId, quantity) {
        if (quantity === void 0) { quantity = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var orderId, currentCartItem, res, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, (0, exports.createOrder)(userId)];
                    case 1:
                        orderId = _a.sent();
                        return [4 /*yield*/, (0, exports.getOrderItemById)(orderId, productId)];
                    case 2:
                        currentCartItem = _a.sent();
                        if (currentCartItem) {
                            return [2 /*return*/, this.updateOrderItem(orderId, productId, quantity)];
                        }
                        return [4 /*yield*/, DB_1.pgDb.query("\n        INSERT into order_items(order_id,product_id,quantity)\n        VALUES($1,$2,$3)\n        RETURNING *\n      ", [orderId, productId, quantity])];
                    case 3:
                        res = _a.sent();
                        return [2 /*return*/, res.rows[0]];
                    case 4:
                        error_7 = _a.sent();
                        throw new Error("failed to add product to cart. ".concat(error_7));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderModel.prototype.deleteOrder = function (orderId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n       DELETE FROM orders WHERE id = $1;\n      ", [orderId])];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, orderId];
                    case 2:
                        error_8 = _a.sent();
                        throw new Error("failed to delete order. ".concat(error_8));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrderModel;
}());
exports.getOrderById = (_a = new OrderModel(), _a.getOrderById), exports.getOrderItemById = _a.getOrderItemById, exports.getOrderByUserId = _a.getOrderByUserId, exports.createOrder = _a.createOrder, exports.completeOrder = _a.completeOrder, exports.addProductToCart = _a.addProductToCart, exports.updateOrderItem = _a.updateOrderItem, exports.deleteOrder = _a.deleteOrder;
