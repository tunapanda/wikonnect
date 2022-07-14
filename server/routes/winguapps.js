const Router = require("koa-router");
const { nanoid } = require('nanoid');
const bcrypt = require("bcrypt");
const UserModel = require("../models/user");
const GroupMembers = require("../models/group_members");

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
  const userQuery = UserModel.query();

  const { email, phone, token, apiKey } = ctx.query;

  if (apiKey !== process.env.API_KEY) {
    ctx.status = 401;
    return;
  }

  try {
    ctx.assert((email || phone), 400, "Email or phone is required");

    if (phone) {
      userQuery.where({ contactNumber: phone });
    }

    if (email && phone) {
      userQuery.orWhere({ email });
    }
    else if (email) {
      userQuery.where({ email });
    }

    let user = await userQuery.limit(1);

    const authorizationToken = nanoid();

    if (user.length === 0) {
      const hash = await bcrypt.hash(nanoid(11), 10);

      user = await UserModel.query().insertAndFetch({
        username: email,
        email: email,
        contactNumber: phone,
        hash: hash,
        authorizationToken: authorizationToken,
        winguToken: token
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
          winguToken: token
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
