const Router = require('koa-router');
const User = require('../models/user');
const validateNewUser = require('../middleware/validateNewUser')
const bcrypt = require('bcrypt');
const authenticate = require('../middleware/authenticate');
const jsonwebtoken = require('jsonwebtoken');
const jwt = require('../middleware/jwt');

const router = new Router({
    prefix: '/auth'
});


/**
 * You can register with:
 * curl -X POST -d 'user[email]=kenya@tunapanda.org&user[username]=mountkenya&user[hash]=mountkenya' http://localhost:3000/api/v1/auth/register
 */
router.post('/register', authenticate.getUserByUsername, async ctx => {
    ctx.request.body.user.username = ctx.request.body.user.username.toLowerCase();
    ctx.request.body.user.hash = await bcrypt.hash(ctx.request.body.user.hash, 5);
    // ctx.request.body.lastip = ctx.req.socket.remoteAddress;
    let newUser = ctx.request.body.user;
    const user = await User.query().insertAndFetch(newUser);
    ctx.status = 201;
    ctx.body = { user };
});

/**
 * You can login with:
 * curl -X POST -d 'user[username]=mountkenya&user[hash]=mountkenya' http://localhost:3000/api/v1/auth/login
 */

router.post('/login', async ctx => {
    let user = await User.query().where("username", ctx.request.body.user.username);
    if (!user) {
        ctx.status = 401;
        ctx.body = {
            error: "bad username"
        }
        return;
    }

    const hashPassword = user[0].hash;
    const userInfoWithoutPassword = delete user[0].hash;
    if (await bcrypt.compare(ctx.request.body.user.hash, hashPassword)) {
        ctx.body = {
            token: jsonwebtoken.sign({
                data: userInfoWithoutPassword,
                //exp in seconds
                exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
            }, jwt.secret)
        }
    } else {
        ctx.status = 401;
        ctx.body = {
            error: "bad password"
        }
        return;
    }
    return ctx;
});

module.exports = router.routes();
