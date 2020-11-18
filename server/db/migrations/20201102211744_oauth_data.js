
exports.up = knex => {
  return knex.schema
    .createTable('oauth2', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('provider');
      table.text('user_id');
      table.text('email');
      table.timestamps();
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('oauth2');
};
