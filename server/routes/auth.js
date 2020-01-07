const Router = require('koa-router');
const User = require('../models/user');
const validateAuthRoutes = require('../middleware/validation/validateAuthRoutes');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { secret } = require('../middleware/jwt');
const sendMAil = require('../utils/sendMail');
const redis = require('redis');
const redisClient = redis.createClient(); // default setting.


// function(callback) {
//   redisClient.exists(req.body.to, function (err, reply) {
//     if (err) {
//       return callback(true, "Error in redis");
//     }
//     if (reply === 1) {
//       return callback(true, "Email already requested");
//     }
//     callback(null);
//   });
// }
// function(callback) {
//   // Generating random string.
//   let rand = Math.floor((Math.random() * 100) + 54);
//   let encodedMail = new Buffer(req.body.to).toString('base64');
//   let link = "http://" + req.get('host') + "/verify?mail=" + encodedMail + "&id=" + rand;
//   let mailOptions = {
//     from: 'youremail@domain.com',
//     to: req.body.to,
//     subject: "Please confirm your Email account",
//     html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
//   };
//   callback(null, mailOptions, rand);
// },

const router = new Router({
  prefix: '/auth'
});

router.post('/', validateAuthRoutes.validateUserLogin, async ctx => {
  let user = await User.query().where('username', ctx.request.body.username);
  ctx.assert(user.length, 401, 'no user', { errors: { username: ['Username does not exist.'] } });
  let { hash: hashPassword, ...userInfoWithoutPassword } = user[0];

  user = user[0];
  // add to user group on creation
  // user id and groupName
  // adding role into  data signing object
  let role = 'basic';
  userInfoWithoutPassword['role'] = role;

  if (await bcrypt.compare(ctx.request.body.password, hashPassword)) {
    // eslint-disable-next-line require-atomic-updates
    ctx.body = {
      token: jsonwebtoken.sign({
        data: userInfoWithoutPassword,
        exp: Math.floor(Date.now() / 1000 + 604800) // 60 seconds * 60 minutes * 24 hours * 7 days = 1 week
      }, secret)
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      error: 'bad password'
    };
  }
});

router.get('/reset/:mail', async ctx => {
  let confirmEmail = await User.query().where('email', ctx.params.mail);
  confirmEmail = confirmEmail[0];

  if (!confirmEmail) {
    ctx.throw(401, 'no user found with that email');
  }

  const rand = Math.floor((Math.random() * 100) + 54);
  const resetMail = confirmEmail.email;

  const reply = redisClient.exists(resetMail);
  if (reply !== true) {
    ctx.throw(401, 'Email verification already requested');
  }

  redisClient.set(resetMail, rand);
  redisClient.expire(resetMail, 600);

  try {
    const buf = Buffer.from(resetMail, 'ascii').toString('base64');
    sendMAil(buf, rand);
  } catch (error) {
    console.log(error.message);
  }

  ctx.status = 201;
  ctx.body = { confirmEmail };
});

router.get('/validate', async ctx => {
  const decodedMail = Buffer.from(ctx.query.mail, 'base64').toString('ascii');

  const getEmail = redisClient.get(decodedMail);
  if (getEmail === false) {
    ctx.throw(401, 'Invalid email address');
  }
  const delEmail = redisClient.del(decodedMail, ctx.query.id);
  if (delEmail !== true) {
    ctx.throw(401, 'Token error');
  }

  ctx.status = 200;
  ctx.body = { message: 'Email has been verified' };

});

module.exports = router.routes();
