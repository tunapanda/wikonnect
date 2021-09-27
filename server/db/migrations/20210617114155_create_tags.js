const { idGenerator } = require('../id_generator');

exports.up = (knex) => {
  return knex.schema
    .raw(idGenerator)
    .createTable('tags', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('name').unique();
      table.text('slug').unique();
      table.text('metadata');
      table.text('creator_id').references('users.id').onDelete('SET NULL');
      table.boolean('can_delete').defaultTo(true);
      table.timestamps();

    });
};


exports.down = (knex) => {
  return knex.schema
    .dropTableIfExists('tags');
};
