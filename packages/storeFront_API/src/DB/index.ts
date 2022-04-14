import { Pool } from "pg";
import { pgPassword, pgPort, pgHost, pgDbName, pgUser } from "../config/env";

export const pgDb = new Pool({
  host: pgHost,
  database: pgDbName,
  port: pgPort,
  user: pgUser,
  password: pgPassword,
});
