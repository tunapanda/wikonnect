
exports.up = function (knex) {
  return knex.schema
    .table('achievements', table => {
      table.text('user_id');
      table.text('target');
      table.text('target_status');
      table.dropColumn('activity_id');
      table.dropColumn('slug');
      table.dropColumn('name');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('achievements', table => {
      table.dropColumn('user_id');
      table.dropColumn('target');
      table.dropColumn('target_status');
    });
};
