
exports.up = function (knex) {
  return knex.schema
    .table('achievements', table => {
      table.text('user_id');
      table.text('target');
      table.text('target_status');
      table.dropColumn('activity_id');
      table.dropColumn('slug');
      table.dropColumn('name');
    })
    .table('achievement_awards', table => {
      table.text('badge_name');
      table.text('image_url');
      table.text('metadata');
      table.dropColumn('achievement_id');
      table.dropColumn('user_id');
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema
    .table('achievements', table => {
      table.dropColumn('user_id');
      table.dropColumn('target');
      table.dropColumn('target_status');
    }).table('achievement_awards', table => {
      table.dropColumn('user_id');
      table.dropColumn('badge_name');
      table.dropColumn('image_url');
      table.dropColumn('metadata');
    });
};
