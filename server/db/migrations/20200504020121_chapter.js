
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.specificType('tags', 'text ARRAY');
    });

};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('tags');
    });
};
