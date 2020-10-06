const log = require('../utils/logger');
const CampaignMain = require('../../models/campaign_main');



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

async function mojaCampaigns(ctx, userId) {
  try {
    let moja_query_params = {
      userId: userId,
      campaignId: ctx.request.body.user.campaign_id,
      points: ctx.request.body.user.points,
      enduserId: ctx.request.body.user.enduser_id,
      partnerId: ctx.request.body.user.partner_id
    };
    let campaign = await CampaignMain.query.insertAndFetch(moja_query_params);
    return campaign;
  } catch (error) {
    log.info('No extra params passed for users %s', userId);
  }
}


/**
 TODO: Linking Wikonnect account to moja account using a link button
 * @param {*} ctx
 * @param {*} next
 */


/**
 TODO: Add fetch package for webhook request to the moja platform
 * POST request accepting -> (campaign_id, points, enduser_id, partner_id, userId)
 *
 * */

module.exports = { mojaCampaigns };
