import dotenv from "dotenv";
dotenv.config();
import { throwError } from "../utils/throwError";

const {
  SERVER_URL,
  PG_HOST_DEV,
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
  RDS_HOSTNAME,
  RDS_USERNAME,
  RDS_PASSWORD,
} = process.env;

export const isTest = NODE_ENV === "test";
export const isStaging = NODE_ENV === "staging";

const pgHost = isStaging ? RDS_HOSTNAME : PG_HOST_DEV;

const pgPort = +(PG_PORT || 5432);

const pgDbName = isTest ? TEST_PG_DB : isStaging ? undefined : PG_DB;

const pgUser = isStaging ? RDS_USERNAME : PG_USER;

const pgPassword = isTest
  ? TEST_PG_PASSWORD
  : isStaging
  ? RDS_PASSWORD
  : PG_PASSWORD;

const SALT = SALT_ROUNDS ? +SALT_ROUNDS : 10;

const jwtSecret = JWT_SECRET ?? throwError("JWT_SECRET is required");

export {
  pgPassword,
  pgDbName,
  pgPort,
  SERVER_URL,
  pgHost,
  pgUser,
  SALT,
  PEPPER,
  jwtSecret,
};
