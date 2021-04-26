const { idGenerator } = require('../id_generator');

exports.up = function(knex) {
  return knex.schema
    .raw(idGenerator)
    .createTable('notifications', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('title').notNullable();
      table.text('body');
      table.text('item_id');
      table.text('event_type').notNullable();
      table.text('model');
      table.text('recipient_id').references('users');
      table.text('creator_id').references('users');
      table.boolean('read').defaultTo(false);
      table.jsonb('metadata');
      table.timestamps();

    });


};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('notifications');
};
