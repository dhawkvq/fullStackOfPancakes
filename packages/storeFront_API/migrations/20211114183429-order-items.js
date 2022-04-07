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
    "order_items",
    {
      id: { type: "int", primaryKey: true, autoIncrement: true },
      quantity: "int",
      product_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "order_items_product_id_fk",
          table: "products",
          rules: {
            onDelete: "CASCADE",
          },
          mapping: "id",
        },
      },
      order_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "order_items_order_id_fk",
          table: "orders",
          rules: {
            onDelete: "CASCADE",
          },
          mapping: "id",
        },
      },
    },
    () => console.log("order_items table created")
  );
  return null;
};

exports.down = function (db) {
  db.dropTable("order_items", () => console.log("order_items tabled dropped"));
  return null;
};

exports._meta = {
  version: 1,
};
