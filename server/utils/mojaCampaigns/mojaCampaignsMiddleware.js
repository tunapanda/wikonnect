const log = require('../logger');
const { mojaEndpoint } = require('./mojaEndpoint');
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

  if (query.partner_id != null) {
    let campaign_data = {
      partner_id: query.partner_id,
      enduser_id: query.enduser_id,
      campaign_id: query.campaign_id,
      points: query.points,
    };

    let part = await knex('campaign_partner').insert({ partner_id: query.partner_id }).returning(['id']);
    let us = await knex('campaign_user').insert({ user_id: userId, enduser_id: query.enduser_id }).returning(['id']);
    let main = await knex('campaign_main').insert({ campaign_id: query.campaign_id, award_points: query.points, partner_id: query.partner_id }).returning(['id']);

    log.info(part, us, main);
    log.info(campaign_data);

    await mojaEndpoint(campaign_data);
  }

}

module.exports = {
  mojaCampaignsMiddleware
};
