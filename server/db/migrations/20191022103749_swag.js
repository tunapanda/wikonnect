const { idGenerator, idGenRemoval } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .raw(idGenerator)
    .createTable('users', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('email').unique().index();
      table.text('username').unique().index();
      table.text('hash');
      table.text('last_seen');
      table.text('last_ip');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('groups', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name');
      table.text('slug');
      table.text('description');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('group_members', table => {
      table.text('user_id').references('users');
      table.text('group_id').references('groups');
      table.primary(['user_id', 'group_id']);
      table.timestamps();
    })
    .createTable('group_permissions', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('group_id').references('groups');
      table.text('name');
      table.timestamps();
    })
    .createTable('learning_paths', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name');
      table.text('slug');
      table.text('description');
      table.text('status'); // draft/published/archived
      table.text('creator_id').references('users');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('courses', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name');
      table.text('slug');
      table.text('description');
      table.text('status'); // draft/published/archived
      table.text('creator_id').references('users');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('learning_path_courses', table => {
      table.text('learning_path_id').references('learning_paths');
      table.text('course_id').references('courses');
      table.primary(['learning_path_id', 'course_id']);
      table.timestamps();
    })
    .createTable('modules', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name');
      table.text('slug');
      table.text('description');
      table.text('status'); // draft/published/archived
      table.text('creator_id').references('users');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('course_modules', table => {
      table.text('course_id').references('courses');
      table.text('module_id').references('modules');
      table.primary(['course_id', 'module_id']);
      table.timestamps();
    })
    .createTable('lessons', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name');
      table.text('slug');
      table.text('description');
      table.text('status'); // draft/published/archived
      table.text('creator_id').references('users');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('module_lessons', table => {
      table.text('module_id').references('modules');
      table.text('lesson_id').references('lessons');
      table.primary(['module_id', 'lesson_id']);
      table.timestamps();
    })
    .createTable('chapters', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('lesson_id').references('lessons');
      table.text('name');
      table.text('slug');
      table.text('description');
      table.text('status'); // draft/published/archived
      table.text('creator_id').references('users');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('enrollments', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('course_id').references('courses');
      table.text('user_id').references('users');
      table.text('status');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('activity', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('chapter_id').references('chapters');
      table.text('user_id').references('users');
      table.text('status');
      table.text('progress');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('achievements', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name');
      table.text('slug');
      table.text('description');
      table.text('activity_id');
      table.jsonb('metadata');
      table.timestamps();
    })
    .createTable('achievement_awards', table => {
      table.text('achievement_id').references('achievements');
      table.text('user_id').references('users');
      table.primary(['achievement_id', 'user_id']);
      table.timestamps();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('groups')
    .dropTableIfExists('group_members')
    .dropTableIfExists('group_permissions')
    .dropTableIfExists('learning_paths')
    .dropTableIfExists('courses')
    .dropTableIfExists('learning_path_courses')
    .dropTableIfExists('modules')
    .dropTableIfExists('course_modules')
    .dropTableIfExists('lessons')
    .dropTableIfExists('module_lessons')
    .dropTableIfExists('chapters')
    .dropTableIfExists('enrollments')
    .dropTableIfExists('activity')
    .dropTableIfExists('achievements')
    .dropTableIfExists('achievement_awards')
    .raw(idGenRemoval);
