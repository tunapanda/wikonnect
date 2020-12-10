
exports.up = function (knex) {
  return knex.schema
    .table('ratings', table => {
      table.text('category');
      table.specificType('labels', 'text ARRAY');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('ratings', table => {
      table.dropColumn('category');
      table.dropColumn('labels');
    });
};
