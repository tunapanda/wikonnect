const Router = require("koa-router");
const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");

const router = new Router({
  prefix: "/winguapps"
});

const DOMAIN_NAME = process.env.DOMAIN_NAME || 'http://localhost:4200';

/**
 * {
 *  "email": "john@example.com",
 *  "phone": "123456789",
 *  "token": "secret",
 * }
 */
router.post("/", async (ctx) => {
  try {
    // check if user exists using email and phone number
    let user = await UserModel.query()
      .where({ contactNumber: ctx.request.body.phone })
      .orWhere({ email: ctx.request.body.email })
      .limit(1);

    const authorizationToken = nanoid();

    if (user.length === 0) {
      const hash = await bcrypt.hash(nanoid(11), 10);

      user = await UserModel.query().insertAndFetch({
        username: ctx.request.body.email,
        email: ctx.request.body.email,
        contactNumber: ctx.request.body.phone,
        hash: hash,
        authorizationToken: authorizationToken,
        winguToken: ctx.request.body.token
      });

      await GroupMembers.query().insert({
        user_id: user.id,
        group_id: "groupBasic",
      });
    } else {
      await UserModel.query()
        .findById(user[0].id)
        .patch({
          authorizationToken: authorizationToken,
          winguToken: ctx.request.body.token
        });
    }

    ctx.status = 200;
    ctx.body = {
      redirect_url: `${DOMAIN_NAME}/login?preauthtoken=${authorizationToken}`,
    };
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }
});

module.exports = router.routes();
