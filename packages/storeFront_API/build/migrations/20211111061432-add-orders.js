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
    "orders",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      status: { type: "string", defaultValue: "active" },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "orders_user_id_fk",
          table: "users",
          rules: {
            onDelete: "CASCADE",
          },
          mapping: "id",
        },
      },
    },
    () => console.log("created orders table")
  );
  return null;
};

exports.down = function (db) {
  db.dropTable("orders", () => console.log("dropped orders table"));
  return null;
};

exports._meta = {
  version: 1,
};
