
exports.up = knex => {
  return knex.schema
    .createTable('reactions', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('reaction');
      table.text('chapterId');
      table.text('userId');
      table.timestamps();
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('reactions');
};
