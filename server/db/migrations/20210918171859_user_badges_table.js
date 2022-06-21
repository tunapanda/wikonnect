const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('user_badges', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('badge_id').references('badges.id').onDelete('CASCADE');
      table.text('user_id').references('users.id').onDelete('CASCADE');
      table.timestamps(); // date created == date awarded
    });


};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('user_badges');
};
