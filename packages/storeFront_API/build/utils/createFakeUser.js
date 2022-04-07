"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFakeUser = void 0;
var faker_1 = __importDefault(require("faker"));
var models_1 = require("../models");
function createFakeUser(firstName, lastName, password) {
    return (0, models_1.addUser)(firstName !== null && firstName !== void 0 ? firstName : faker_1.default.name.firstName(), lastName !== null && lastName !== void 0 ? lastName : faker_1.default.name.lastName(), password !== null && password !== void 0 ? password : "secret");
}
exports.createFakeUser = createFakeUser;
