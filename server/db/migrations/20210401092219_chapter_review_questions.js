exports.up = function(knex) {
  return  knex.schema
    .table('chapters',table=>{
      table.specificType('review_questions', 'text ARRAY');
    });
    
};

exports.down = function(knex) {
  return knex.schema
    .table('chapters', table => {
      table.dropColumn('review_questions');
    });
};
