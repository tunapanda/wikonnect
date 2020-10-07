const log = require('../utils/logger');
const CampaignMain = require('../../models/campaign_main');
const postData = require('./mojaEndpoint');



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
  let moja_query_params;
  try {
    moja_query_params = {
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


  postData(moja_query_params)
    .then(data => {
      console.log(data); // JSON data parsed by `data.json()` call
    });
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

// const data = {
//   'enduser_id': '3ffcaa53-c5e6-4273-868c-f8d398e6602d',
//   'partner_id': 'adfc0e69-4fe0-4708-85e6-0ba40f901261',
//   'campaign_id': '2b40b903-fbe1-4f4d-b2dd-f707fb7d6edb',
//   'points': 5
// };




module.exports = { mojaCampaigns };
