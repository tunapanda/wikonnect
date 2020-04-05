
exports.up = function (knex) {
  return knex.schema
    .table('users', table => {
      table.text('profile_uri');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('users', table => {
      table.dropColumn('profile_uri');
    });
};
