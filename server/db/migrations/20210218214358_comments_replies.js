
exports.up = function (knex) {
  return knex.schema
    .table('comments', table => {
      table.text('parent_id');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('comments', table => {
      table.dropColumn('parent_id');
    });
};
