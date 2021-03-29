
exports.up = function (knex) {
  return knex.schema
    .createTable('parent_child_comments', table => {
      table.text('parent_id').references('id').inTable('comments').onDelete('SET NULL').onUpdate('CASCADE');
      table.text('child_id').references('id').inTable('comments').onDelete('SET NULL').onUpdate('CASCADE');
    }).table('comments', table => {
      table.dropColumn('parent_id');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('parent_child_comments')
    .table('comments', table => {
      table.text('parent_id');
    });
};
