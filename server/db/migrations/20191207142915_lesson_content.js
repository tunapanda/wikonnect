
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.text('content_type');
      table.text('content_uri');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('content_type');
      table.dropColumn('content_uri');
    });
};
