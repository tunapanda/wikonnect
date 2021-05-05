const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('badge_triggers', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('trigger');
      table.text('description');
    })
    .createTable('badges', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('creator_id').references('users.id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.text('name');
      table.text('slug');
      table.text('badge_uri');
      table.text('trigger').references('badge_triggers.id')
        .onDelete('SET NULL')
        .onUpdate('CASCADE');
      table.integer('points').defaultTo(1);
      table.text('description');
      table.dateTime('expiry');
      table.boolean('is_deleted').defaultTo(false);
      table.jsonb('metadata');
      table.timestamps();
    });
};

exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('badges')
    .dropTableIfExists('badge_triggers');
};
