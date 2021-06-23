const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('tag_followers', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('tag_id').references('tags.id').onDelete('CASCADE');
      table.text('user_id').references('users.id').onDelete('CASCADE');
      table.timestamps();
      table.unique(['tag_id', 'user_id']);

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('tag_followers');
};
