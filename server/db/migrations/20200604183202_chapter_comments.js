
exports.up = function (knex) {
  return knex.schema
    .createTable('comments', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('chapter_id');
      table.text('creator_id');
      table.text('comment');
      table.text('metadata');
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('comments');
};
