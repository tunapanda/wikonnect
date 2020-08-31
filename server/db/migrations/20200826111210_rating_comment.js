
exports.up = function (knex) {
  return knex.schema
    .table('ratings', table => {
      table.text('comment');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('ratings', table => {
      table.dropColumn('comment');
    });
};
