
exports.up = function(knex) {
  return knex.schema
    .table('ratings',table=>{
      table.text('review_id');
      table.decimal('average_rating');
      table.text('reaction');
      table.boolean('is_deleted').defaultTo(false);


      table.dropColumn('rating');
      table.dropColumn('comment');
      table.dropColumn('category');
      table.dropColumn('labels');
    });
};

exports.down = function(knex) {

  return knex.schema
    .table('ratings',table=>{
      table.dropColumn('review_id');
      table.dropColumn('average_rating');
      table.dropColumn('reaction');
      table.dropColumn('is_deleted');

      table.integer('rating');
      table.text('comment');
      table.text('category');
      table.specificType('labels', 'text ARRAY');
    });
};
