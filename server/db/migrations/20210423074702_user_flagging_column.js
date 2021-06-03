
exports.up = knex => {
  return knex.schema
    .table('users', table => {
      table.boolean('flag').defaultTo(false);
    });
};

exports.down = knex => {
  return knex.schema
    .table('users', table => {
      table.dropColumn('flag');
    });
};
