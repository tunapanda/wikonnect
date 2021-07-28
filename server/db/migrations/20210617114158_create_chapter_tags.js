const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('chapter_tags', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('chapter_id').references('chapters.id').onDelete('CASCADE');
      table.text('tag_id').references('tags.id').onDelete('CASCADE');
      table.text('creator_id').references('users.id').onDelete('SET NULL');
      table.unique(['chapter_id', 'tag_id']);
      table.timestamps();

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('chapter_tags');
};
