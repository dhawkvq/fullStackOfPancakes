import { verify } from "jsonwebtoken";
import { jwtSecret } from "../../../config/env";
import { createFakeUser } from "../../../utils/createFakeUser";
import {
  allUsers,
  addUser,
  deleteUser,
  getUserById,
  updateUser,
  signIn,
} from "../UserModel";

describe("models/User allUsers", () => {
  it("returns all the users contained in the DB", async () => {
    const curUsers = await allUsers();
    expect(curUsers).toBeInstanceOf(Array);
  });
});

describe("models/User addUser", () => {
  it("inserts a new user and returns a user with jwt token", async () => {
    const { jwt } = await addUser("harry", "potter", "secret");
    try {
      const payload = verify(jwt, jwtSecret);
      expect(payload).toBeTruthy();
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });
});

describe("models/User getUserById", () => {
  it("returns a user of type User", async () => {
    const fakeUser = await createFakeUser();
    const user = await getUserById(fakeUser.id);
    expect(user.id).toBeInstanceOf(Number);
    expect(user.first_name).toBeInstanceOf(String);
    expect(user.last_name).toBeInstanceOf(String);
    expect(user.password).toBeInstanceOf(String);
  });
});

describe("models/User updateUser", () => {
  it("returns a user with the properly upated info", async () => {
    const fakeUser = await createFakeUser("Jhonny");
    const updatedUser = await updateUser(fakeUser.id, {
      first_name: "Derrick",
    });
    expect(updatedUser?.first_name).toBe("Derrick");
  });

  it("returns null from being passed no info to update user with", async () => {
    const fakeUser = await createFakeUser("Jose");
    const notUpdatedUser = await updateUser(fakeUser.id, { first_name: "" });
    expect(notUpdatedUser).toBe(null);
  });
});

describe("models/User signIn", () => {
  it("returns a JWT on successful login", async () => {
    const user = await addUser("Emilio", "Estevez", "MightyDuckManHimself");
    const jwt = await signIn(
      user.first_name,
      user.last_name,
      "MightyDuckManHimself"
    );
    expect(jwt).toBeInstanceOf(String);
  });
});

describe("models/User deleteUser", () => {
  it("deletes a user by their id", async () => {
    const user = await addUser("Emilio", "Estevez", "MightyDuckManHimself");
    await deleteUser(user.id);
    const deletedUser = await getUserById(user.id);
    expect(deletedUser).toBeFalsy();
  });
});
