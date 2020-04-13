const { idGenerator, idGenRemoval } = require('../id_generator');

exports.up = function (knex) {
  return knex.schema
    .table('users', table => {
      table.text('profile_uri');
      table.text('invite_code');
    })
    .raw(idGenerator)
    .createTable('user_invite_tracker', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id');
      table.text('invited_by').unique().index();
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('users', table => {
      table.dropColumn('profile_uri');
      table.dropColumn('invite_code');
    })
    .dropTableIfExists('user_invite_tracker')
    .raw(idGenRemoval);
};
