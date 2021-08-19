
exports.up = function(knex) {
  return knex.schema.createTable('chapter_feedback', (table) => {
    table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
    table.text('chapter_id');
    table
      .foreign('chapter_id')
      .references('chapters.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('creator_id');
    table
      .foreign('creator_id')
      .references('users.id')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');
    table.text('comment');
    table.text('parent_id');
    table.text('metadata');
    table.timestamps();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('chapter_feedback');
};
