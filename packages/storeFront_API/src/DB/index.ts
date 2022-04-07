import { Pool } from "pg";
import { pgPort } from "../config/env";

export const pgDb = new Pool({
  host: process.env.RDS_HOSTNAME,
  port: pgPort,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});
