const { idGenerator } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .raw(idGenerator)
    .createTable('dashboard', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('key_result');
      table.integer('achieved');
      table.text('quarter');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('targets', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('key_result');
      table.integer('target');
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('dashboard')
    .dropTableIfExists('targets');
