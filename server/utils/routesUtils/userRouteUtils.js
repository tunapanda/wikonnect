const s3 = require('../s3Util');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');


const User = require('../../models/user');
const AchievementAward = require('../../models/achievement_awards');

const log = require('../logger');
const knex = require('../knexUtil');
const { wikonnectUser } = require('../mojaCampaigns/mojaEndpoint');


async function achievementAwardsType(parent) {
  try {
    if (parent.length == undefined) {
      parent.achievementAwards.forEach(award => {
        return award.type = 'achievementAward';
      });
    } else {
      parent.forEach(mod => {
        mod.achievementAwards.forEach(award => {
          return award.type = 'achievementAward';
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}

async function userRoles(parent) {
  try {
    if (parent.length == undefined) {
      parent.roles.forEach(role => {
        return role.type = 'roles';
      });
    } else {
      parent.forEach(roles => {
        roles.roles.forEach(role => {
          return role.type = 'roles';
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}

async function enrolledCoursesType(parent) {
  try {
    if (parent.length == undefined) {
      parent.enrolledCourses.forEach(lesson => {
        return lesson.type = 'course';
      });
    } else {
      parent.forEach(mod => {
        mod.enrolledCourses.forEach(lesson => {
          return lesson.type = 'course';
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}


function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}

async function getProfileImage(id) {

  try {
    if (s3.config) {
      const params = {
        Bucket: s3.config.bucket, // pass your bucket name
        Key: `uploads/profiles/${id}.jpg`, // key for saving filename
      };

      const getImage = await s3.s3.getObject(params).promise();
      let image = 'data:image/(png|jpg);base64,' + encode(getImage.Body);
      return image;
    } else {
      return 'images/profile-placeholder.gif';
    }
  } catch (e) {
    return 'images/profile-placeholder.gif';
  }
}
async function createPasswordHash(ctx, next) {
  if (ctx.request.body.user.password) {
    const hash = await bcrypt.hash(ctx.request.body.user.password, 10);

    delete ctx.request.body.user.password;
    ctx.request.body.user.hash = hash;
  }
  await next();
}

async function getGoogleToken(ctx, next) {
  if (ctx.request.body.user.username == 'google'){
    const token = ctx.request.body.user.password;
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
    const body = await response.text();
    console.log(body);
    console.log('\tsent token');
    ctx.request.body.user.email = body.email;
    // const userId = response.user_id;
    // const userEmail = response.email;
    // ctx.body = {
    //   token: jsonwebtoken.sign({
    //     data: { userId: userId, email: userEmail },
    //     exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
    //   }, secret)
    // };
  }
  await next();
}

async function profileCompleteBoolean(params) {
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

async function inviteUserAward(params) {
  let completed = await knex('user_invite')
    .count('invited_by')
    .select('invited_by')
    .where({ 'invited_by': params.invitedBy })
    .groupBy('invited_by')
    .having(knex.raw('count(invited_by) > 0'));

  await AchievementAward.query().insert({
    'name': 'Invited 1 users',
    'achievementId': 'achievements12',
    'userId': completed[0].invited_by
  });

  if (params.metadata.oneInviteComplete == 'false' && completed > 0) {
    await User.query().patchAndFetchById(params.id, { 'metadata:oneInviteComplete': 'true' });
    await wikonnectUser(params.id);
  }
}


module.exports = {
  achievementAwardsType,
  userRoles,
  enrolledCoursesType,
  createPasswordHash,
  profileCompleteBoolean,
  inviteUserAward,
  getProfileImage,
  getGoogleToken
};