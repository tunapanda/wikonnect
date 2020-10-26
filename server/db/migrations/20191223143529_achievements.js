
exports.up = knex =>
  knex.schema
    .table('achievements', table => {
      table.text('user_id');
      table.text('target');
      table.text('target_status');
      table.dropColumn('activity_id');
      table.dropColumn('slug');
      table.dropColumn('name');
    })
    .table('achievement_awards', table => {
      table.text('name');
      table.text('slug');
      table.text('image_url');
      table.text('metadata');
      table.text('id').notNullable().defaultTo(knex.raw('next_id()'));
    });

exports.down = knex =>
  knex.schema
    .table('achievements', table => {
      table.dropColumn('user_id');
      table.dropColumn('target');
      table.dropColumn('target_status');
    })
    .table('achievement_awards', table => {
      table.dropColumn('name');
      table.dropColumn('slug');
      table.dropColumn('image_url');
      table.dropColumn('metadata');
    });
