import { User } from "../types";
import { createFakeUser } from "./createFakeUser";

// For test development only
export const createFakeUsers = async (
  length: number
): Promise<(User & { jwt: string })[]> => {
  try {
    const usersArray = await Promise.all(
      Array.from({ length }).map(() => createFakeUser())
    );
    return usersArray;
  } catch (error) {
    throw new Error(`problem creating fake users. ${error}`);
  }
};
