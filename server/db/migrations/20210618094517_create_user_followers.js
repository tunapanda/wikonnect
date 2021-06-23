const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('user_followers', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id').references('users.id').onDelete('CASCADE');
      table.text('following_id').references('users.id').onDelete('CASCADE');
      table.timestamps();
      table.unique(['user_id', 'following_id']);

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('user_followers');
};
