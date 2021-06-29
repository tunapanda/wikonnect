const { idGenerator, idGenRemoval } = require('../id_generator');

exports.up = knex =>
  knex.schema
    .createTable('user_badges', table => {
      table.text('user_id')
        .references('users.id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.text('badge_id')
        .references('badges.id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.timestamps();
    });

exports.down = knex =>
  knex.schema
    .dropTableIfExists('user_badges');
