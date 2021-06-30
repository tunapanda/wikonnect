
exports.up = function(knex) {
  return knex.schema.table("chapters", (table) => {
    table.boolean("revision_requested").defaultTo(false);
  });
};

exports.down = function(knex) {
  return knex.schema.table("chapters", (table) => {
    table.dropColumn("revision_requested");
  });
};
