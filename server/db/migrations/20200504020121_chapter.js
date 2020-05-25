
exports.up = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.text('tags');
    });

};

exports.down = function (knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('tags');
    });
};
