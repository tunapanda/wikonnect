
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.text('content_id');
      table.text('approved');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('content_id');
      table.dropColumn('approved');
    });
};
