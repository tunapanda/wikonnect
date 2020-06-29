const { idGenerator } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .raw(idGenerator)
    .createTable('rating', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('chapter_id');
      table.integer('rating');
      table.integer('voters');
      table.jsonb('metadata');
      table.timestamps();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('rating');