import dotenv from "dotenv";
dotenv.config();

const {
  SERVER_URL,
  PG_HOST,
  PG_PORT,
  PG_USER,
  PG_PASSWORD,
  TEST_PG_PASSWORD,
  PG_DB,
  TEST_PG_DB,
  NODE_ENV,
  SALT_ROUNDS,
  PEPPER,
  JWT_SECRET,
} = process.env;

export const isTest = NODE_ENV === "test";

const throwError = (message: string) => {
  throw new Error(message);
};

const pgPassword = isTest ? TEST_PG_PASSWORD : PG_PASSWORD;

const pgDbName = isTest ? TEST_PG_DB : PG_DB;

const pgPort = +(PG_PORT || 5432);

const SALT = SALT_ROUNDS ? +SALT_ROUNDS : 10;

const jwtSecret = JWT_SECRET ?? throwError("JWT_SECRET is required");

export {
  pgPassword,
  pgDbName,
  pgPort,
  SERVER_URL,
  PG_HOST,
  PG_USER,
  SALT,
  PEPPER,
  jwtSecret,
};
