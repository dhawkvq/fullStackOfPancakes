"use strict";

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  db.createTable(
    "users",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      first_name: "string",
      last_name: "string",
      password: "string",
    },
    () => console.log("users table created")
  );
  return null;
};

exports.down = function (db) {
  db.dropTable("users", () => console.log("dropped table users"));
  return null;
};

exports._meta = {
  version: 1,
};
