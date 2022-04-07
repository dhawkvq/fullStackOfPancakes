import * as bcrypt from "bcrypt";
import { SALT, PEPPER } from "../config/env";

export function hashPassword(password: string): string {
  return bcrypt.hashSync(password + PEPPER, SALT);
}

export async function compareHashedPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password + PEPPER, hashedPassword);
}
