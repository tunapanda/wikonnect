const { idGenerator } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .raw(idGenerator)
    .createTable('user_verification', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id').references('users.id');
      table.text('email').defaultTo('false');
      table.text('phone_number').defaultTo('false');
      table.jsonb('metadata');
      table.timestamps();
    })
    .table('users', table => {
      table.text('profile_uri');
      table.text('invite_code');
    })
    .createTable('user_invite', table => {
      table.text('user_id');
      table.text('invited_by');
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('user_verification')
    .dropTableIfExists('user_invite')
    .table('users', table => {
      table.dropColumn('profile_uri');
      table.dropColumn('invite_code');
    });
