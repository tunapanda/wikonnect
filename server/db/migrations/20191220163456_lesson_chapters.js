const { idGenerator, idGenRemoval } = require('../id_generator');

exports.up = function (knex) {
  return knex.schema
    .raw(idGenerator)
    .createTable('lesson_chapters', table => {
      table.text('lesson_id').references('modules');
      table.text('chapter_id').references('modules');
      table.primary(['lesson_id', 'chapter_id']);
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('lesson_chapters')
};
