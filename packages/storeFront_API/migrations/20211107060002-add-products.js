"use strict";

const { devNull } = require("os");

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
    "products",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      name: "string",
      price: "int",
    },
    () => console.log("products table created")
  );
  return null;
};

exports.down = function (db) {
  db.dropTable("products", () => console.log("dropped table products"));
  return null;
};

exports._meta = {
  version: 1,
};
