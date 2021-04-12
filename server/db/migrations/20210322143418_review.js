const { idGenerator } = require('../id_generator');

exports.up = function(knex) {
  return knex.schema
    .raw(idGenerator)
    .createTable('reviews', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('chapter_id');
      table.text('user_id');
      table.text('rating_id');
      table.text('reaction');
      table.jsonb('metadata');
      table.boolean('is_deleted').defaultTo(false);
      table.timestamps();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('reviews');
};
