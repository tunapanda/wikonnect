const Router = require('koa-router');

const User = require('../models/user');
const Achievement = require('../models/achievement');
const AchievementAward = require('../models/achievement_awards');
const log = require('../utils/logger');

const knex = require('../utils/knexUtil');
const { requireAuth } = require('../middleware/permController');
const customWebhook = require('../utils/customWebhook');

const router = new Router({
  prefix: '/achievements'
});

async function chapterCompletionAward(params) {
  let completed = await knex('achievements')
    .count('target')
    .select('target_status')
    .where({ 'user_id': params.userId })
    .groupBy('target', 'target_status')
    .having(knex.raw('count(target) > 0'));

  try {
    if (completed[0].count === 1) {
      await AchievementAward.query().insert({
        'name': 'completed 1 chapter',
        'achievementId': 'achievements14',
        'userId': params.userId
      });
      await User.query().patchAndFetchById(params.id, { 'metadata:oneChapterCompletion': 'true' });
    } else if (completed[0].count > 2) {
      await AchievementAward.query().insert({
        'name': 'completed 3 chapters',
        'achievementId': 'achievements15',
        'userId': params.userId
      });
      await User.query().patchAndFetchById(params.userId, { 'metadata:threeChapterCompletion': 'true' });
    }
  } catch (error) {
    log.info(error.message);
  }
}


/**
* @api {get} /api/v1/achievements GET all achievements.
* @apiName GetAchievements
* @apiGroup Achievements
*
* @apiParam {string} achievement[description] optional achievement description
* @apiParam {string} achievement[user_id] optional user id
* @apiParam {string} achievement[target] optional chapter id for the achievement given
* @apiParam {string} achievement[target_status] optional either completed, started or attempted
* @apiParam {string} achievement[metadata] optional
*
* @apiPermission none
* @apiSampleRequest off
*

 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
        "achievement": [
          {
            "id": "achievements1",
            "description": "completed chapter 2",
            "metadata": null,
            "createdAt": "2017-12-20T16:17:10.000Z",
            "updatedAt": "2017-12-20T16:17:10.000Z",
            "userId": "user1",
            "target": "chapter2",
            "targetStatus": "completed"
          },
          {
            "id": "achievements2",
            "description": "completed chapter1",
            "metadata": null,
            "createdAt": "2017-12-20T16:17:10.000Z",
            "updatedAt": "2017-12-20T16:17:10.000Z",
            "userId": "user1",
            "target": "chapter1",
            "targetStatus": "completed"
          },
        ]
      }
 * @apiError {String} errors Bad Request.
 */

router.get('/', requireAuth, async ctx => {
  try {
    let achievement = await Achievement.query().where(ctx.query);
    achievement.imageUrl = '/uploads/images/profile-placeholder.gif';
    ctx.status = 200;
    ctx.body = { achievement };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
});


/**
   * return the count of completed chapter
   * @param {object[]} dataRange
   * @return {Integer}
   */

router.get('/date/:startDate/:endDate', requireAuth, async ctx => {

  // const from = '2017-12-20';
  // const to = '2018-12-20';
  const from = ctx.params.startDate;
  const to = ctx.params.endDate;

  let achievement;
  try {
    achievement = await knex('achievements')
      .select()
      .where({ target_status: 'completed' })
      .whereBetween('created_at', [from, to]);
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }



  ctx.status = 200;
  ctx.body = { achievement: achievement.length };
});

/**
* @api {get} /api/v1/achievements/:id GET an achievement.
* @apiName GetAnAchievement
* @apiGroup Achievements
*
* @apiPermission none
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*        "achievement": {
*          "id": "achievements1",
*          "description": "completed chapter 2",
*          "metadata": null,
*          "createdAt": "2017-12-20T16:17:10.000Z",
*          "updatedAt": "2017-12-20T16:17:10.000Z",
*          "userId": "user1",
*          "target": "chapter2",
*          "targetStatus": "completed"
*        }
*      }
*
*/
router.get('/:id', requireAuth, async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);
  if (!achievement) {
    ctx.assert(achievement, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { achievement };
});

/**
* @api {post} /api/v1/achievements POST create a achievements.
* @apiName PostAnAchievement
* @apiGroup Achievements
*
* @apiParam {string} achievement[description] achievement description
* @apiParam {string} achievement[user_id] user id
* @apiParam {string} achievement[target] chapter id for the achievement given
* @apiParam {string} achievement[target_status] either completed, started or attempted
* @apiParam {string} achievement[metadata] optional
*
* @apiPermission none
* @apiSampleRequest off
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     {
*        "achievement": {
*          "id": "string",
*          "description": "string",
*          "metadata": "jsonb",
*          "user_id": "string",
*          "target": "chapter id",
*          "target_status": "either completed, started or attempted"
*        }
*     }
*
* @apiError {String} errors Bad Request.
*/


router.post('/', requireAuth, async ctx => {
  let stateUserRole = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;

  const newAchievement = ctx.request.body.achievement;
  newAchievement.userId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  const achievement = await Achievement.query().insertAndFetch(newAchievement);

  if (stateUserRole != 'anonymous') {
    chapterCompletionAward(newAchievement);
  }

  // trigger webhook util, currently sending data to webhook.site
  await customWebhook('https://webhook.site/d1f35372-7cbb-4d55-9169-38e9d4a3402d', newAchievement);


  ctx.status = 201;
  ctx.body = { achievement };
});

/**
* @api {put} /api/v1/achievements/:id PUT an achievement.
* @apiName PutAnAchievement
* @apiGroup Achievements
*
* @apiParam {string} achievement[description] optional achievement description
* @apiParam {string} achievement[user_id] optional user id
* @apiParam {string} achievement[target] optional chapter id for the achievement given
* @apiParam {string} achievement[target_status] optional either completed, started or attempted
* @apiParam {string} achievement[metadata] optional
*
* @apiPermission none
* @apiSampleRequest off
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     {
*        "achievement": {
*          "id": "string",
*          "description": "string",
*          "metadata": "jsonb",
*          "user_id": "string",
*          "target": "chapter id",
*          "target_status": "either completed, started or attempted",
*          "createdAt": "2020-11-25T12:56:52.895Z",
 *         "updatedAt": "2020-11-25T12:56:52.895Z"
*        }
*     }
*
* @apiError {String} errors Bad Request.
*/

router.put('/:id', requireAuth, async ctx => {
  let putAchievement = ctx.request.body.achievement;
  const achievement_record = await Achievement.query().findById(ctx.params.id);

  if (!achievement_record) {
    ctx.throw(400, 'That achievement does not exist');
  }
  const achievement = await Achievement.query().patchAndFetchById(ctx.params.id, putAchievement);

  ctx.status = 201;
  ctx.body = { achievement };
});

/**
* @api {delete} /api/v1/achievements/:id DELETE an achievement.
* @apiName DeleteAnAchievement
* @apiGroup Achievements
*
* @apiPermission none
* @apiSampleRequest off
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 201 OK
*     {
*        "achievement": {
*          "id": "string",
*          "description": "string",
*          "metadata": "jsonb",
*          "user_id": "string",
*          "target": "chapter id",
*          "target_status": "either completed, started or attempted",
*          "createdAt": "2020-11-25T12:56:52.895Z",
 *         "updatedAt": "2020-11-25T12:56:52.895Z"
*        }
*     }
*
* @apiError {String} errors Bad Request.
*/
router.delete('/:id', requireAuth, async ctx => {
  const achievement = await Achievement.query().findById(ctx.params.id);

  if (!achievement) {
    ctx.assert(achievement, 401, 'No ID was found');
  }

  await Achievement.query().delete().where({ id: ctx.params.id });


  ctx.status = 200;
  ctx.body = { achievement };
});


module.exports = router.routes();
