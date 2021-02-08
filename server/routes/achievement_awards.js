const Router = require('koa-router');
const AchievementAward = require('../models/achievement_awards');
const { requireAuth } = require('../middleware/permController');


const router = new Router({
  prefix: '/achievementAwards'
});


/**
* @api {get} /api/v1/achievementAwards POST create a achievements.
* @apiName GetAchievementAwards
* @apiGroup AchievementAwards
*
* @apiParam {string} achievementAwards[id] optional achievement-award id
* @apiParam {string} achievementAwards[user_id] optional user id
* @apiParam {string} achievementAwards[achievementId] optional achievement id
* @apiParam {string} achievementAwards[metadata] optional
*
* @apiPermission none
* @apiSampleRequest off
*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*        "achievementAwards": [
*          {
*            "achievementId": "achievements1",
*            "userId": "user1",
*            "createdAt": "2017-12-20T16:17:10.000Z",
*            "updatedAt": "2017-12-20T16:17:10.000Z",
*            "name": "longest streak",
*            "slug": null,
*            "imageUrl": "/badges/badge1.png",
*            "metadata": null,
*            "id": "IrSGD70AAA4"
*          },
*          {
*            "achievementId": "achievements2",
*            "userId": "user2",
*            "createdAt": "2017-12-20T16:17:10.000Z",
*            "updatedAt": "2017-12-20T16:17:10.000Z",
*            "name": "completed courses",
*            "slug": null,
*            "imageUrl": "/badges/badge1.png",
*            "metadata": null,
*            "id": "IrSGD8MAAA8"
*          }
*        ]
*      }
*
* @apiError {String} errors Bad Request.
*/
router.get('/', requireAuth, async ctx => {
  const achievementAwards = await AchievementAward.query().where(ctx.query);
  ctx.assert(achievementAwards, 404, 'No matching record found');
  ctx.status = 200;
  ctx.body = { achievementAwards };
});

/**
* @api {get} /api/v1/achievements/:id GET an achievement.
* @apiName GetAnAchievementAward
* @apiGroup AchievementAwards
*
* @apiPermission none
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*     {
*        "achievementAwards": {
*            "achievementId": "achievements1",
*            "userId": "user1",
*            "createdAt": "2017-12-20T16:17:10.000Z",
*            "updatedAt": "2017-12-20T16:17:10.000Z",
*            "name": "longest streak",
*            "slug": null,
*            "imageUrl": "/badges/badge1.png",
*            "metadata": null,
*            "id": "IrSGD70AAA4"
*          }
*      }
* @apiError {String} errors Bad Request.
*/
router.get('/:id', requireAuth, async ctx => {
  let achievementAwards = await AchievementAward.query().findById(ctx.params.id);
  const date = new Date(achievementAwards.createdAt);
  achievementAwards.createdAt = date.toDateString().slice(0, 10);

  ctx.assert(achievementAwards, 404, 'No matching record found');
  ctx.status = 200;
  ctx.body = { achievementAwards };
});

module.exports = router.routes();
