
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.text('content_id');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('content_id');
    });
};
