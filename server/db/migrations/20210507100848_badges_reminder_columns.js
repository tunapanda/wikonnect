
exports.up = knex => {
  return knex.schema
    .table('badges', table => {
      table.integer('reminder').defaultTo(1);
      table.text('reminder_message');
    });
};

exports.down = knex => {
  return knex.schema
    .table('badges', table => {
      table.dropColumn('reminder');
      table.dropColumn('reminder_message');
    });
};
