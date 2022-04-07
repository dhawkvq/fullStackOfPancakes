"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleWare = void 0;
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var response_time_1 = __importDefault(require("response-time"));
exports.middleWare = express_1.default.Router();
exports.middleWare.use((0, cors_1.default)({ origin: "*" }));
exports.middleWare.use(express_1.default.json());
exports.middleWare.use((0, response_time_1.default)());
