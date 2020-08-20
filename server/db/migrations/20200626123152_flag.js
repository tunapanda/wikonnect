
exports.up = knex =>
  knex.schema
    .createTable('flags', table => {
      table.text('id').notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id');
      table.text('chapter_id');
      table.text('comment');
      table.timestamps();
    });
    
exports.down = knex =>
  knex.schema
    .dropTableIfExists('flags');
