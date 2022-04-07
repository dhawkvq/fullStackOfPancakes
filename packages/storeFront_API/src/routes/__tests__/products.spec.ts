import { app } from "../../app";
import supertest from "supertest";

const request = supertest(app);

describe("routes/products", () => {
  describe("GET /products", () => {
    it("returns the stuff", (done) => {
      request
        .get("/products")
        .expect(200)
        .end((error, res) => {
          if (error) throw error;
          expect(res.body).toBeInstanceOf(Array);
          done();
        });
    });
  });

  describe("POST /products", () => {
    it("creates a new product", (done) => {
      request
        .post("/products")
        .set("Accept", "application/json")
        .send({ name: "creed cologne", price: 40000 })
        .expect(201)
        .then((res) => res.body)
        .then((item) => {
          expect(item.id).toBeInstanceOf(Number);
          expect(item.name).toBe("creed cologne");
          expect(item.price).toBe(40000);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => done());
    });

    it("throws error when name arg is not passed to POST /products", (done) => {
      request
        .post("/products")
        .send({ price: 400000 })
        .expect(400)
        .then((res) => res.body)
        .catch((error) => {
          expect(error.message).toBe("expected arg was not of type string.");
        })
        .finally(() => done());
    });

    it("throws error when price arg is not passed to POST /products", (done) => {
      request
        .post("/products")
        .send({ name: "creed cologne" })
        .expect(400)
        .then((res) => res.body)
        .catch((error) => {
          expect(error.message).toBe("expected arg was not of type string.");
        })
        .finally(() => done());
    });
  });
});
