"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgDb = void 0;
var pg_1 = require("pg");
var env_1 = require("../config/env");
exports.pgDb = new pg_1.Pool({
    host: process.env.RDS_HOSTNAME,
    port: env_1.pgPort,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
});
