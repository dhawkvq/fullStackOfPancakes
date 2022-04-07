"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../../app");
var supertest_1 = __importDefault(require("supertest"));
var jsonwebtoken_1 = require("jsonwebtoken");
var env_1 = require("../../config/env");
var request = (0, supertest_1.default)(app_1.app);
describe("routes/users", function () {
    describe("GET /users", function () {
        it("returns all the users", function (done) {
            request
                .get("/users")
                .expect(200)
                .then(function (res) { return res.body; })
                .then(function (users) {
                expect(users).toBeInstanceOf(Array);
            })
                .catch(function (error) { return console.log(error); })
                .finally(function () { return done(); });
        });
    });
    describe("POST /users", function () {
        it("creates a new user", function (done) {
            request
                .post("/users")
                .send({ firstName: "Derrick", lastName: "Hawkins", password: "secret" })
                .expect(201)
                .then(function (res) {
                (0, jsonwebtoken_1.verify)(res.body.token, env_1.jwtSecret, function (err, decoded) {
                    expect(!err).toBeTruthy();
                    expect(decoded.first_name).toBe("Derrick");
                    expect(decoded.last_name).toBe("Hawkins");
                    expect(decoded.id).toBeInstanceOf(Number);
                });
            })
                .catch(function (error) { return console.log(error); })
                .finally(function () { return done(); });
        });
    });
});
