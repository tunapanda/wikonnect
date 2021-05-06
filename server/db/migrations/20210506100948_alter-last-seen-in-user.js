
exports.up = knex => {
  return knex.schema
    .alterTable('users', table => {
      table.dateTime('last_seen').alter();
    });
};

exports.down = knex => {
  return knex.schema
    .alterTable('users', table => {
      table.text('last_seen').alter();
    });
};
