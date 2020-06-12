
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.text('approved');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('approved');
    });
};
