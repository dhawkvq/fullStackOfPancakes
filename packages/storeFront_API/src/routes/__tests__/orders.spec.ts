import supertest from "supertest";
import { app } from "../../app";
import { createFakeOrder } from "../../utils/createFakeOrder";
import { createFakeUser } from "../../utils/createFakeUser";

const request = supertest(app);

describe("routes/orders", () => {
  describe("GET /orders/:userId", () => {
    it("returns the users current cart", async () => {
      const fakeUser = await createFakeUser();
      await createFakeOrder(fakeUser.id);
      const { status, user_id } = (await request.get(`/orders/${fakeUser.id}`))
        .body;
      expect(status).toBe("active");
      expect(user_id).toBe(fakeUser.id);
    });
  });
});
