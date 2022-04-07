"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.deleteUser = exports.updateUser = exports.getUserById = exports.addUser = exports.allUsers = void 0;
var DB_1 = require("../../DB");
var env_1 = require("../../config/env");
var generateSetSql_1 = require("../../utils/generateSetSql");
var jsonwebtoken_1 = require("jsonwebtoken");
var password_1 = require("../../utils/password");
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.allUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("SELECT * FROM users")];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.rows];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error("failed to get all users. ".concat(error_1));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.addUser = function (firstName, lastName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var res, user, jwt, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = (0, password_1.hashPassword)(password);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n          INSERT INTO users(first_name,last_name,password) \n          VALUES($1,$2,$3) \n          RETURNING *\n        ", [firstName, lastName, password])];
                    case 2:
                        res = _a.sent();
                        user = res.rows[0];
                        jwt = (0, jsonwebtoken_1.sign)(user, env_1.jwtSecret);
                        return [2 /*return*/, __assign(__assign({}, user), { jwt: jwt })];
                    case 3:
                        error_2 = _a.sent();
                        throw new Error("failed to add user. ".concat(error_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("SELECT * FROM users WHERE id = $1", [id])];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.rows[0]];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error("failed to retrieve user by id. ".concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.updateUser = function (id, options) {
        return __awaiter(this, void 0, void 0, function () {
            var keysAndVals, _a, setSqlStatement, values, res, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        keysAndVals = Object.entries(options).filter(function (_a) {
                            var val = _a[1];
                            return val;
                        });
                        if (!keysAndVals.length)
                            return [2 /*return*/, null];
                        _a = (0, generateSetSql_1.generateSetSql)(keysAndVals), setSqlStatement = _a.setSqlStatement, values = _a.values;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n          UPDATE users\n          ".concat(setSqlStatement, "\n          WHERE id = $").concat(values.length + 1, "\n          RETURNING *\n        "), __spreadArray(__spreadArray([], values, true), [id], false))];
                    case 2:
                        res = _b.sent();
                        return [2 /*return*/, res.rows[0]];
                    case 3:
                        error_4 = _b.sent();
                        throw new Error("unable to update user. ".concat(error_4));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, DB_1.pgDb.query("DELETE FROM users WHERE id = $1", [id])];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        throw new Error("failed to delete user. ".concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.signIn = function (firstName, lastName, password) {
        return __awaiter(this, void 0, void 0, function () {
            var res, user, matches, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, DB_1.pgDb.query("\n        SELECT * \n        FROM users \n        WHERE first_name = $1 \n        AND last_name = $2\n      ", [firstName, lastName])];
                    case 1:
                        res = _a.sent();
                        user = res.rows[0];
                        return [4 /*yield*/, (0, password_1.compareHashedPassword)(password, user.password)];
                    case 2:
                        matches = _a.sent();
                        if (matches)
                            return [2 /*return*/, (0, jsonwebtoken_1.sign)(user, env_1.jwtSecret)];
                        throw new Error("the user credentials passed are not valid");
                    case 3:
                        error_6 = _a.sent();
                        throw new Error("failed to sign in user: ".concat(error_6));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports.allUsers = (_a = new UserModel(), _a.allUsers), exports.addUser = _a.addUser, exports.getUserById = _a.getUserById, exports.updateUser = _a.updateUser, exports.deleteUser = _a.deleteUser, exports.signIn = _a.signIn;
