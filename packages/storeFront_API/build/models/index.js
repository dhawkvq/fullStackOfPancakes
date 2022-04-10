"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProducts = exports.getProductById = exports.addProduct = exports.updateUser = exports.getUserById = exports.addUser = exports.allUsers = void 0;
var UserModel_1 = require("./User/UserModel");
Object.defineProperty(exports, "allUsers", { enumerable: true, get: function () { return UserModel_1.allUsers; } });
Object.defineProperty(exports, "addUser", { enumerable: true, get: function () { return UserModel_1.addUser; } });
Object.defineProperty(exports, "getUserById", { enumerable: true, get: function () { return UserModel_1.getUserById; } });
Object.defineProperty(exports, "updateUser", { enumerable: true, get: function () { return UserModel_1.updateUser; } });
var ProductModel_1 = require("./Product/ProductModel");
Object.defineProperty(exports, "addProduct", { enumerable: true, get: function () { return ProductModel_1.addProduct; } });
Object.defineProperty(exports, "getProductById", { enumerable: true, get: function () { return ProductModel_1.getProductById; } });
Object.defineProperty(exports, "allProducts", { enumerable: true, get: function () { return ProductModel_1.allProducts; } });