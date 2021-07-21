const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('course_tags', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('course_id').references('courses.id').onDelete('CASCADE');
      table.text('tag_id').references('tags.id').onDelete('CASCADE');
      table.text('creator_id').references('users.id').onDelete('SET NULL');
      table.unique(['course_id', 'tag_id']);
      table.timestamps();

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('course_tags');
};
