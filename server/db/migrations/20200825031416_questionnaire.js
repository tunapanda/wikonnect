const { idGenerator } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .raw(idGenerator)
    .createTable('questionnaires', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id');
      table.text('question');
      table.text('objective');
      table.text('key_result');
      table.text('answer');
      table.jsonb('metadata');
      table.timestamps;
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('questionnaires');