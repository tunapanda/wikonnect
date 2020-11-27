
exports.up = knex => {
  return knex.schema
    .createTable('reactions', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('reaction');
      table.text('chapter_id');
      table.text('user_id');
      table.timestamps();
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('reactions');
};
