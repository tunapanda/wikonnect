const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('course_playlist', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('course_id').references('courses.id').onDelete('CASCADE');
      table.text('chapter_id').references('chapters.id').onDelete('CASCADE');
      table.text('rank');
      table.unique(['course_id', 'chapter_id']);
      table.timestamps();

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('course_playlist');
};
