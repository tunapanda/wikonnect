
exports.up = knex => {
  return knex.schema
    .createTable('counter', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('trigger');
      table.text('chapterId');
      table.integer('counter');
      table.timestamps();
    });
};

exports.down = knex => {
  return knex.schema
    .dropTableIfExists('counter');
};
