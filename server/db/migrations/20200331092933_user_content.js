
exports.up = function (knex) {
  return knex.schema
    .table('users', table => {
      table.text('private');
    });

};

exports.down = function (knex) {
  return knex.schema
    .table('users', table => {
      table.dropColumn('private');
    });
};
