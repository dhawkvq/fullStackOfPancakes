import faker from "faker";
import { User } from "../types";
import { addUser } from "../models";

export function createFakeUser(
  firstName?: string,
  lastName?: string,
  password?: string
): Promise<User & { jwt: string }> {
  return addUser(
    firstName ?? faker.name.firstName(),
    lastName ?? faker.name.lastName(),
    password ?? "secret"
  );
}
