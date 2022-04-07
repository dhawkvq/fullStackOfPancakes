import { app } from "../../app";
import supertest from "supertest";
import { verify } from "jsonwebtoken";
import { jwtSecret } from "../../config/env";

const request = supertest(app);

describe("routes/users", () => {
  describe("GET /users", () => {
    it("returns all the users", (done) => {
      request
        .get("/users")
        .expect(200)
        .then((res) => res.body)
        .then((users) => {
          expect(users).toBeInstanceOf(Array);
        })
        .catch((error) => console.log(error))
        .finally(() => done());
    });
  });

  describe("POST /users", () => {
    it("creates a new user", (done) => {
      request
        .post("/users")
        .send({ firstName: "Derrick", lastName: "Hawkins", password: "secret" })
        .expect(201)
        .then((res) => {
          verify(res.body.token, jwtSecret, (err: any, decoded: any) => {
            expect(!err).toBeTruthy();
            expect(decoded.first_name).toBe("Derrick");
            expect(decoded.last_name).toBe("Hawkins");
            expect(decoded.id).toBeInstanceOf(Number);
          });
        })
        .catch((error) => console.log(error))
        .finally(() => done());
    });
  });
});
