const log = require('../logger');
const CampaignMain = require('../../models/campaign_main');
const knex = require('../knexUtil');
/**
 *
 * Handling redirect from moja campaign platform to
 * sign up page with the following query params
 *
 *  @param {ctx} campaign_id
 *  @param {ctx} points
 *  @param {ctx} enduser_id
 *  @param {ctx} partner_id
 *  @param {*} userId
 *
 */

async function mojaCampaignsMiddleware(query, userId) {


  let campaign_partner_data = {
    partner_id: query.partner_id
  };
  let campaign_user_data = {
    user_id: userId,
    enduser_id: query.enduser_id
  };
  let campaign_main_data = {
    campaign_id: query.campaign_id,
    award_points: query.points,
    partner_id: query.partner_id
  };
  console.log(campaign_partner_data, campaign_user_data, campaign_main_data);
  let part = await knex('campaign_partner').insert(campaign_partner_data).returning(['id']);
  let us = await knex('campaign_user').insert(campaign_user_data).returning(['id']);
  let main = await knex('campaign_main').insert(campaign_main_data).returning(['id']);

  console.log(part, us, main);

}

module.exports = {
  mojaCampaignsMiddleware
};
