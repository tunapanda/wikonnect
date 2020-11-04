
exports.up = function (knex) {
  return knex.schema
    .table('users', table => {
      table.specificType('topics', 'text ARRAY');
    })
    .table('chapters', table => {
      table.specificType('topics', 'text ARRAY');
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('users', table => {
      table.dropColumn('topics');
    })
    .table('chapters', table => {
      table.dropColumn('topics');
    });
};
