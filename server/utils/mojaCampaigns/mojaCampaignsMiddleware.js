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

    let campaign_partner = await knex('campaign_partner').insert({ partner_id: query.partner_id }).returning(['id']);
    let campaign_user = await knex('campaign_user').insert({ user_id: userId, enduser_id: query.enduser_id }).returning(['id']);
    let campaign_main = await knex('campaign_main').insert({ campaign_id: query.campaign_id, award_points: query.points, partner_id: query.partner_id }).returning(['id']);

    log.info(`User ${userId} campaign data ${campaign_data}`);
    log.info(`Successful insert of campaign data ${campaign_partner}, ${campaign_user}, ${campaign_main}`);

    await mojaEndpoint(campaign_data);
  }

}

module.exports = {
  mojaCampaignsMiddleware
};
