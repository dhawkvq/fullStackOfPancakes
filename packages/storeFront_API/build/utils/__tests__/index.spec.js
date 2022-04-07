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
var generateSetSql_1 = require("../generateSetSql");
var createFakeUsers_1 = require("../createFakeUsers");
var createFakeProducts_1 = require("../createFakeProducts");
var assert_1 = require("../assert");
var password_1 = require("../password");
describe("utils generateSetSql", function () {
    it("generates proper return type of GenerateSqlReturn", function () {
        var args = [
            ["first_name", "Derrick"],
            ["last_name", "Hawkins"],
        ];
        var argVals = args.map(function (_a) {
            var val = _a[1];
            return val;
        });
        var _a = (0, generateSetSql_1.generateSetSql)(args), setSqlStatement = _a.setSqlStatement, values = _a.values;
        expect(setSqlStatement).toBeInstanceOf(String);
        expect(values.every(function (key) { return typeof key === "string"; })).toBeTruthy();
        expect(setSqlStatement).toBe("SET first_name = $1,last_name = $2");
        expect(argVals.every(function (val) { return values.includes(val); })).toBeTruthy();
        expect(values.indexOf("Derrick")).toBe(0);
        expect(values.indexOf("Hawkins")).toBe(1);
    });
});
describe("utils createFakeUsers", function () {
    it("creates the number of fake users that the dev asks for", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeUsers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createFakeUsers_1.createFakeUsers)(10)];
                case 1:
                    fakeUsers = _a.sent();
                    expect(fakeUsers).toBeInstanceOf(Array);
                    expect(fakeUsers.length).toBe(10);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("utils createFakeProducts", function () {
    it("created an an array of products the of the length the dev provides", function () { return __awaiter(void 0, void 0, void 0, function () {
        var fakeProducts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, createFakeProducts_1.createFakeProducts)(10)];
                case 1:
                    fakeProducts = _a.sent();
                    expect(fakeProducts).toBeInstanceOf(Array);
                    expect(fakeProducts.length).toBe(10);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("utils/assert assertString", function () {
    it("returns arg if the arg passed is of type string", function () {
        expect((0, assert_1.assertString)("nice")).toBe("nice");
    });
    it("returns false if the arg passed would convert to a number", function () {
        expect(function () { return (0, assert_1.assertString)("1234"); }).toThrowError("expected arg was not of type string.");
    });
});
describe("utils/assert assertNumber", function () {
    it("returns the arg passed is of type string but converts to number without error", function () {
        expect((0, assert_1.assertNumber)("1234")).toBe(1234);
    });
    it("returns false if the arg passed would not convert to a number", function () {
        expect(function () { return (0, assert_1.assertNumber)("1234notSoMuch"); }).toThrowError("expected arg was not of type number.");
    });
});
describe("utils/password compareHashedPasswords", function () {
    it("returns what i want", function () { return __awaiter(void 0, void 0, void 0, function () {
        var password, hashedPassword, match;
        return __generator(this, function (_a) {
            password = "secret";
            hashedPassword = (0, password_1.hashPassword)(password);
            match = (0, password_1.compareHashedPassword)(password, hashedPassword);
            expect(match).toBeTruthy();
            return [2 /*return*/];
        });
    }); });
});
