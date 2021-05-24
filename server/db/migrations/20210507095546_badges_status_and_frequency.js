
exports.up = knex => {
  return knex.schema
    .table('badges', table => {
      table.boolean('published').defaultTo(true);
      table.integer('frequency').defaultTo(1);

    });
};

exports.down = knex => {
  return knex.schema
    .table('badges', table => {
      table.dropColumn('published');
      table.dropColumn('frequency');
    });
};
