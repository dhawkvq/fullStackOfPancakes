import { createFakeUsers } from "./createFakeUsers";
import { createFakeProducts } from "./createFakeProducts";
import { createFakeOrder } from "./createFakeOrder";

(async () => {
  try {
    console.log("Creating 10 fake users");
    await createFakeUsers(10);
    console.log("Created 10 fake users");
    console.log("Creating 10 fake products");
    await createFakeProducts(10);
    console.log("Created 10 fake products");
    console.log("Created fake order");
    await createFakeOrder(1);
  } catch (error) {
    throw new Error(`failed to seed DB. ${error}`);
  }
})();
