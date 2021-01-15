
exports.up = function (knex) {
  return knex.schema
    .createTable('campaign_partner', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('partner_id');
    })
    .createTable('campaign_main', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('campaign_id');
      table.text('partner_id');
      table.text('total_points');
      table.text('award_points');
      table.timestamps();
    })
    .createTable('campaign_user', table => {
      table.text('id').primary().notNullable().defaultTo(knex.raw('next_id()'));
      table.text('user_id');
      table.text('enduser_id');
      table.timestamps();
    });
};
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('campaign_partner')
    .dropTableIfExists('campaign_main')
    .dropTableIfExists('campaign_user');
};
