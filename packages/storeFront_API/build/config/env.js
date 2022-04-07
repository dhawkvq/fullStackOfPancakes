"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtSecret = exports.PEPPER = exports.SALT = exports.PG_USER = exports.PG_HOST = exports.SERVER_URL = exports.pgPort = exports.pgDbName = exports.pgPassword = exports.isTest = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var _a = process.env, SERVER_URL = _a.SERVER_URL, PG_HOST = _a.PG_HOST, PG_PORT = _a.PG_PORT, PG_USER = _a.PG_USER, PG_PASSWORD = _a.PG_PASSWORD, TEST_PG_PASSWORD = _a.TEST_PG_PASSWORD, PG_DB = _a.PG_DB, TEST_PG_DB = _a.TEST_PG_DB, NODE_ENV = _a.NODE_ENV, SALT_ROUNDS = _a.SALT_ROUNDS, PEPPER = _a.PEPPER, JWT_SECRET = _a.JWT_SECRET;
exports.SERVER_URL = SERVER_URL;
exports.PG_HOST = PG_HOST;
exports.PG_USER = PG_USER;
exports.PEPPER = PEPPER;
exports.isTest = NODE_ENV === "test";
var throwError = function (message) {
    throw new Error(message);
};
var pgPassword = exports.isTest ? TEST_PG_PASSWORD : PG_PASSWORD;
exports.pgPassword = pgPassword;
var pgDbName = exports.isTest ? TEST_PG_DB : PG_DB;
exports.pgDbName = pgDbName;
var pgPort = +(PG_PORT || 5432);
exports.pgPort = pgPort;
var SALT = SALT_ROUNDS ? +SALT_ROUNDS : 10;
exports.SALT = SALT;
var jwtSecret = JWT_SECRET !== null && JWT_SECRET !== void 0 ? JWT_SECRET : throwError("JWT_SECRET is required");
exports.jwtSecret = jwtSecret;
