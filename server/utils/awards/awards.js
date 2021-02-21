
const User = require('../../models/user');
const AchievementAward = require('../../models/achievement_awards');

const log = require('../logger');
const knex = require('../knexUtil');
// const { wikonnectUser } = require('../mojaCampaigns/mojaEndpoint');


async function profileCompletion(params) {
  const keys = ['profileUri', 'email'];
  keys.forEach((key, index) => {
    if (params[key] != null) {
      log.info(index);
      return 'false';
    } else {
      return 'true';
    }
  });
}

async function profileCompleteBoolean(params, user_id) {

  if (profileCompletion(params) && params.metadata.profileComplete === 'false') {
    await User.query().patchAndFetchById(user_id, { 'metadata:profileComplete': 'true' });
    await AchievementAward.query().insert({
      'name': 'profile completed',
      'achievementId': user_id,
      'userId': user_id
    });
  }
}

async function inviteUserAward(params) {
  try {
    let completed = await knex('user_invite')
      .count('invited_by')
      .select('invited_by')
      .where({ 'invited_by': params })
      .groupBy('invited_by')
      .having(knex.raw('count(invited_by) > 0'));

    if (completed.count > 0) {
      await User.query().patch(completed[0].invited_by, { 'metadata:oneInviteComplete': 'true' });
      // await wikonnectUser(params.id);
      await AchievementAward.query().insert({
        'name': 'Invited 1 users',
        'achievementId': 'achievements12',
        'userId': completed[0].invited_by
      });
    }
  } catch (error) {
    log.error(error);
  }



}

module.exports = {
  profileCompleteBoolean,
  inviteUserAward,
};