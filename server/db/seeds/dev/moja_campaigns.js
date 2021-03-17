
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('campaign_partner').del()
    .then(function () {
      return knex('campaign_partner').insert([
        {
          id: 'partner_id_one',
          partner_id: 'partner_id_wikonnect',
        }
      ]);
    });
};
