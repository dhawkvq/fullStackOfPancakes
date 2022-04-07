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
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../../../config/env");
var createFakeUser_1 = require("../../../utils/createFakeUser");
var UserModel_1 = require("../UserModel");
describe("models/User allUsers", function () {
    it("returns all the users contained in the DB", function () { return __awaiter(void 0, void 0, void 0, function () {
        var curUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, UserModel_1.allUsers)()];
                case 1:
                    curUsers = _a.sent();
                    expect(curUsers).toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("models/User addUser", function () {
    it("inserts a new user and returns a user with jwt token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var jwt, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, UserModel_1.addUser)("harry", "potter", "secret")];
                case 1:
                    jwt = (_a.sent()).jwt;
                    try {
                        payload = (0, jsonwebtoken_1.verify)(jwt, env_1.jwtSecret);
                        expect(payload).toBeTruthy();
                    }
                    catch (error) {
                        expect(error).toBeFalsy();
                    }
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("models/User getUserById", function () {
    it("returns a user of type User", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUser, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)()];
                case 1:
                    fakeUser = _a.sent();
                    return [4 /*yield*/, (0, UserModel_1.getUserById)(fakeUser.id)];
                case 2:
                    user = _a.sent();
                    expect(user.id).toBeInstanceOf(Number);
                    expect(user.first_name).toBeInstanceOf(String);
                    expect(user.last_name).toBeInstanceOf(String);
                    expect(user.password).toBeInstanceOf(String);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("models/User updateUser", function () {
    it("returns a user with the properly upated info", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUser, updatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)("Jhonny")];
                case 1:
                    fakeUser = _a.sent();
                    return [4 /*yield*/, (0, UserModel_1.updateUser)(fakeUser.id, {
                            first_name: "Derrick",
                        })];
                case 2:
                    updatedUser = _a.sent();
                    expect(updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.first_name).toBe("Derrick");
                    return [2 /*return*/];
            }
        });
    }); });
    it("returns null from being passed no info to update user with", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUser, notUpdatedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createFakeUser_1.createFakeUser)("Jose")];
                case 1:
                    fakeUser = _a.sent();
                    return [4 /*yield*/, (0, UserModel_1.updateUser)(fakeUser.id, { first_name: "" })];
                case 2:
                    notUpdatedUser = _a.sent();
                    expect(notUpdatedUser).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("models/User signIn", function () {
    it("returns a JWT on successful login", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, jwt;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, UserModel_1.addUser)("Emilio", "Estevez", "MightyDuckManHimself")];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, (0, UserModel_1.signIn)(user.first_name, user.last_name, "MightyDuckManHimself")];
                case 2:
                    jwt = _a.sent();
                    expect(jwt).toBeInstanceOf(String);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("models/User deleteUser", function () {
    it("deletes a user by their id", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, deletedUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, UserModel_1.addUser)("Emilio", "Estevez", "MightyDuckManHimself")];
                case 1:
                    user = _a.sent();
                    return [4 /*yield*/, (0, UserModel_1.deleteUser)(user.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, UserModel_1.getUserById)(user.id)];
                case 3:
                    deletedUser = _a.sent();
                    expect(deletedUser).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
});
