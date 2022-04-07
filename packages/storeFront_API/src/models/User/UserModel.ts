import { pgDb } from "../../DB";
import { jwtSecret } from "../../config/env";
import { User, UpdateUserOptions } from "../../types";
import { generateSetSql } from "../../utils/generateSetSql";
import { sign } from "jsonwebtoken";
import { compareHashedPassword, hashPassword } from "../../utils/password";

class UserModel {
  async allUsers(): Promise<User[]> {
    try {
      const res = await pgDb.query("SELECT * FROM users");
      return res.rows;
    } catch (error) {
      throw new Error(`failed to get all users. ${error}`);
    }
  }

  async addUser(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User & { jwt: string }> {
    password = hashPassword(password);
    try {
      const res = await pgDb.query(
        `
          INSERT INTO users(first_name,last_name,password) 
          VALUES($1,$2,$3) 
          RETURNING *
        `,
        [firstName, lastName, password]
      );
      const user = res.rows[0];
      const jwt = sign(user, jwtSecret);
      return { ...user, jwt };
    } catch (error) {
      throw new Error(`failed to add user. ${error}`);
    }
  }

  async getUserById(id: number): Promise<User> {
    try {
      const res = await pgDb.query("SELECT * FROM users WHERE id = $1", [id]);
      return res.rows[0];
    } catch (error) {
      throw new Error(`failed to retrieve user by id. ${error}`);
    }
  }

  async updateUser(
    id: number,
    options: UpdateUserOptions
  ): Promise<User | null> {
    const keysAndVals = Object.entries(options).filter(([, val]) => val);
    if (!keysAndVals.length) return null;
    const { setSqlStatement, values } = generateSetSql(keysAndVals);
    try {
      const res = await pgDb.query(
        `
          UPDATE users
          ${setSqlStatement}
          WHERE id = $${values.length + 1}
          RETURNING *
        `,
        [...values, id]
      );
      return res.rows[0];
    } catch (error) {
      throw new Error(`unable to update user. ${error}`);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await pgDb.query("DELETE FROM users WHERE id = $1", [id]);
    } catch (error) {
      throw new Error(`failed to delete user. ${error}`);
    }
  }

  async signIn(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<string> {
    try {
      const res = await pgDb.query(
        `
        SELECT * 
        FROM users 
        WHERE first_name = $1 
        AND last_name = $2
      `,
        [firstName, lastName]
      );
      const user = res.rows[0];
      const matches = await compareHashedPassword(password, user.password);
      if (matches) return sign(user, jwtSecret);
      throw new Error("the user credentials passed are not valid");
    } catch (error) {
      throw new Error(`failed to sign in user: ${error}`);
    }
  }
}

export const {
  allUsers,
  addUser,
  getUserById,
  updateUser,
  deleteUser,
  signIn,
} = new UserModel();
