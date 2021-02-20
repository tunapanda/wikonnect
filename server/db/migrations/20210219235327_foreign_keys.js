exports.up = function (knex) {
  return knex.schema
    .alterTable('counter', (table) => {
      table
        .foreign('chapter_id')
        .references('chapters.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('flags', (table) => {
      table
        .foreign('chapter_id')
        .references('chapters.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('comments', (table) => {
      table
        .foreign('chapter_id')
        .references('chapters.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('creator_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('oauth2', (table) => {
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('email')
        .references('users.email')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('ratings', (table) => {
      table
        .foreign('chapter_id')
        .references('chapters.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('chapters', (table) => {
      table
        .foreign('creator_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('group_members', (table) => {
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('group_id')
        .references('groups.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('reactions', (table) => {
      table
        .foreign('chapter_id')
        .references('chapters.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('achievements', (table) => {
      table
        .foreign('target')
        .references('chapters.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
    .alterTable('achievement_awards', (table) => {
      table
        .foreign('user_id')
        .references('users.id')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable('counter', (table) => {
      table.dropForeign('chapter_id');
    })
    .alterTable('flags', (table) => {
      table.dropForeign('chapter_id');
      table.dropForeign('user_id');
    })
    .alterTable('comments', (table) => {
      table.dropForeign('chapter_id');
      table.dropForeign('creator_id');
    })
    .alterTable('oauth2', (table) => {
      table.dropForeign('user_id');
      table.dropForeign('email');
    })
    .alterTable('ratings', (table) => {
      table.dropForeign('chapter_id');
      table.dropForeign('user_id');
    })
    .alterTable('chapters', (table) => {
      table.dropForeign('creator_id');
    })
    .alterTable('group_members', (table) => {
      table.dropForeign('user_id');
      table.dropForeign('group_id');
    })
    .alterTable('reactions', (table) => {
      table.dropForeign('chapter_id');
      table.dropForeign('user_id');
    })
    .alterTable('achievements', (table) => {
      table.dropForeign('target');
      table.dropForeign('user_id');
    })
    .alterTable('achievement_awards', (table) => {
      table.dropForeign('user_id');
    });
};