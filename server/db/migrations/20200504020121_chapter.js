
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.text('tags');
      table.text('content_id');
    });

};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('tags');
      table.dropColumn('content_id');
    });
};
