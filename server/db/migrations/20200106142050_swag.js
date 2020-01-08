const { idGenerator } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .raw(idGenerator)
    .createTable('user_verification', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id').references('users.id');
      table.text('email').defaultTo('false');
      table.text('phone_number').defaultTo('false');
      table.jsonb('metadata');
      table.timestamps();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('user_verification');
