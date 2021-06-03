const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');

const s3 = require('../s3Util');

function encode(data) {
  let buf = Buffer.from(data);
  return buf.toString('base64');
}

async function getProfileImage(user) {

  try {
    if (s3.config) {
      const params = {
        Bucket: s3.config.bucket, // pass your bucket name
        Key: `uploads/profiles/${user.profileUri}.jpg`, // key for retrieving a filename
      };
      const getImage = await s3.s3.getObject(params).promise();
      return 'data:image/(png|jpg);base64,' + encode(getImage.Body);
    } else {
      if(user.profileUri &&  fs.existsSync(path.resolve(`public/${user.profileUri}`))){
        return user.profileUri;
      }
      return  '/uploads/images/profile-placeholder.gif';
    }
  } catch (e) {
    return '/uploads/images/profile-placeholder.gif';
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
  if (ctx.request.body.user.username === 'google'){
    const response = await fetch('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + ctx.request.body.user.password);

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

module.exports = {
  createPasswordHash,
  getProfileImage,
  getGoogleToken
};