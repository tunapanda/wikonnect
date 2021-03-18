
exports.up = knex => {
  return knex.schema
    .table('comments', table => {
      table.text('parent_id');
    })
    .dropTableIfExists('parent_child_comments');
};

exports.down = knex => {
  return knex.schema
    .table('comments', table => {
      table.dropColumn('parent_id');
    })
    .createTable('parent_child_comments', table => {
      table.text('parent_id').references('id').inTable('comments').onDelete('SET NULL').onUpdate('CASCADE');
      table.text('child_id').references('id').inTable('comments').onDelete('SET NULL').onUpdate('CASCADE');
    });
};
