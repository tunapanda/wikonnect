const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('course_enrollment', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id').references('users.id').onDelete('CASCADE');
      table.text('course_id').references('courses.id').onDelete('CASCADE');
      table.timestamps();
      table.unique(['user_id', 'course_id']);

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('course_enrollment');
};
