
exports.up = function (knex) {
  return knex.schema.table('chapters', (table) => {
    table.boolean('verified');
  }).alterTable('chapters', (table) => {
    table.boolean('approved').notNullable().alter();
  });
};

exports.down = function (knex) {
  return knex.schema.table('chapters', (table) => {
    table.dropColumn('verified');
  }).alterTable('chapters', (table) => {
    table.text('approved').alter();
  });
};
