"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("../../app");
var supertest_1 = __importDefault(require("supertest"));
var request = (0, supertest_1.default)(app_1.app);
describe("routes/products", function () {
    describe("GET /products", function () {
        it("returns the stuff", function (done) {
            request
                .get("/products")
                .expect(200)
                .end(function (error, res) {
                if (error)
                    throw error;
                expect(res.body).toBeInstanceOf(Array);
                done();
            });
        });
    });
    describe("POST /products", function () {
        it("creates a new product", function (done) {
            request
                .post("/products")
                .set("Accept", "application/json")
                .send({ name: "creed cologne", price: 40000 })
                .expect(201)
                .then(function (res) { return res.body; })
                .then(function (item) {
                expect(item.id).toBeInstanceOf(Number);
                expect(item.name).toBe("creed cologne");
                expect(item.price).toBe(40000);
            })
                .catch(function (error) {
                console.log(error);
            })
                .finally(function () { return done(); });
        });
        it("throws error when name arg is not passed to POST /products", function (done) {
            request
                .post("/products")
                .send({ price: 400000 })
                .expect(400)
                .then(function (res) { return res.body; })
                .catch(function (error) {
                expect(error.message).toBe("expected arg was not of type string.");
            })
                .finally(function () { return done(); });
        });
        it("throws error when price arg is not passed to POST /products", function (done) {
            request
                .post("/products")
                .send({ name: "creed cologne" })
                .expect(400)
                .then(function (res) { return res.body; })
                .catch(function (error) {
                expect(error.message).toBe("expected arg was not of type string.");
            })
                .finally(function () { return done(); });
        });
    });
});
