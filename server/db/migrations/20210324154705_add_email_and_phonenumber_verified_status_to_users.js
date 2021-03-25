
exports.up = knex => {
  return knex.schema
    .table('users', table => {
      table.boolean('email_verified').defaultTo(false);
      table.boolean('phone_verified').defaultTo(false);
      table.text('reset_password_token');
      table.dateTime('reset_password_expires');
    })
    .dropTableIfExists('user_verification');
};

exports.down = knex => {
  return knex.schema
    .table('users', table => {
      table.dropColumn('email_verified');
      table.dropColumn('phone_verified');
      table.dropColumn('reset_password_token');
      table.dropColumn('reset_password_expires');
    })
    .createTable('user_verification', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id').references('users.id');
      table.text('email').defaultTo('false');
      table.text('phone_number').defaultTo('false');
      table.jsonb('metadata');
      table.timestamps();
    });
};
