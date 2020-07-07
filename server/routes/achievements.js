const Router = require('koa-router');
const Achievement = require('../models/achievement');
const validateAchievement = require('../middleware/validation/validateAchievement');
const fetch = require('node-fetch');
const log = require('../utils/logger');

const lrsDomain = ' http://www.example.org';
const lrsPrefix = 'data/xAPI/statements';
const lrsServerAuth = 'Basic NTlkZGQzYmY4YTA5ZDAzMzU5OTBiOWZhOjVhZTcyZDA3MjQ4ODdhNWM2MTY4MzEwYQ==';

const router = new Router({
  prefix: '/achievements'
});

router.get('/', async ctx => {
  try {
    const achievement = await Achievement.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { achievement };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});

router.get('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);
  if (!achievement) {
    ctx.assert(achievement, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievement };
});

/**
 * {
  "actor": {
    "name": "Sally Glider",
    "mbox": "mailto:sally@domain.com"
  },
  "verb": {
    "id": "http://adlnet.gov/expapi/verbs/experienced",
    "display": { "en-US": "experienced" }
  },
  "object": {
    "id": "http://example.com/activities/solo-hang-gliding",
    "definition": {
      "name": { "en-US": "Solo Hang Gliding" }
    }
  }
}
 */

/**
 * storing in the postgresql
 *{
 *   "actor": { "mbox": "mailto:test1@example.org" },
 *   "verb": { "id": "http://www.example.org/verb" },
 *   "object": { "id": "http://www.example.org/activity" },
 * }
 */

router.post('/', validateAchievement, async ctx => {
  let newAchievement = ctx.request.body.achievement.statement;

  const xAPIRecord = {
    user_id: newAchievement.actor.mbox,
    target_status: newAchievement.verb.id,
    target: newAchievement.object.id,
    description: newAchievement.object.description
  };

  try {
    await fetch(lrsDomain + lrsPrefix, {
      body: JSON.stringify({
        statement: {
          newAchievement
        },
        ttl: 10000
      }),
      headers: {
        'authorization': lrsServerAuth,
        'content-type': 'application/json',
      },
      method: 'POST'
    });
    log.info(`Connection to Learning Locker on ${lrsDomain} successfully`);
  } catch (e) {
    if (e.name !== 'ConnectionError') {
      log.error(e);
    } else {
      log.info(`Connection to Learning Locker on ${lrsDomain} failed`);
    }
  }
  const achievement = await Achievement.query().insertAndFetch(xAPIRecord);

  ctx.status = 201;
  ctx.body = { achievement };

});
router.put('/:id', async ctx => {
  let putAchievement = ctx.request.body.achievement;
  const achievement_record = await Achievement.query().findById(ctx.params.id);

  if (!achievement_record) {
    ctx.throw(400, 'That achievement does not exist');
  }
  const achievement = await Achievement.query().patchAndFetchById(ctx.params.id, putAchievement);

  ctx.status = 201;
  ctx.body = { achievement };
});
router.delete('/:id', async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);

  if (!achievement) {
    ctx.assert(achievement, 401, 'No ID was found');
  }

  await Achievement.query().delete().where({ id: ctx.params.id });


  ctx.status = 200;
  ctx.body = { achievement };
});


module.exports = router.routes();
