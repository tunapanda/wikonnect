const Router = require('koa-router');
const Counter = require('../models/counter');
const { requireAuth } = require('../middleware/permController');

const router = new Router({
  prefix: '/counters'
});

/**
* @api {get} /api/v1/counters GET all view counters.
* @apiName GetViewCounters
* @apiGroup ViewCounters
*
* @apiParam {string} trigger optional preset triggers
* @apiParam {string} chapterId optional chapter id
* @apiParam {string} counter optional integer counter
*
* @apiPermission none
* @apiSampleRequest off
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    {
*       "counter": [
*         {
*          "id": "1",
*          "trigger": "chapterCompletion",
*          "chapterId": "chapter1",
*          "counter": 3,
*          "createdAt": "2017-12-20T16:17:10.000Z",
*          "updatedAt": "2017-12-20T16:17:10.000Z"
*         },
*         {
*          "id": "2",
*          "trigger": "chapterCompletion",
*          "chapterId": "chapter1",
*          "counter": 3,
*          "createdAt": "2017-12-20T16:17:10.000Z",
*          "updatedAt": "2017-12-20T16:17:10.000Z"
*         }
*       ]
*     }
*/
router.get('/', requireAuth, async ctx => {
  try {
    let counter = await Counter.query().where(ctx.query);
    ctx.status = 200;
    ctx.body = { counter };
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }
});


/**
* @api {get} /api/v1/counters/:id GET a view counter.
* @apiName GetAViewCounters
* @apiGroup ViewCounters
*
* @apiPermission none
* @apiSampleRequest off
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    {
*       "counter": {
*          "id": "1",
*          "trigger": "chapterCompletion",
*          "chapterId": "chapter1",
*          "counter": 3,
*          "createdAt": "2017-12-20T16:17:10.000Z",
*          "updatedAt": "2017-12-20T16:17:10.000Z"
*         }
*     }
*/

router.get('/:id', requireAuth, async ctx => {
  const counter = await Counter.query().findById(ctx.params.id);
  if (!counter) {
    ctx.assert(counter, 404, 'no achievement by that ID');
  }
  ctx.status = 200;
  ctx.body = { counter };
});



/**
* @api {post} /api/v1/counters POST a view counter.
* @apiName PostViewCounters
* @apiGroup ViewCounters
*
* @apiParam {string} counter[trigger] optional preset triggers
* @apiParam {string} counter[chapterId] optional chapter id
* @apiParam {string} counter[counter] optional integer counter
*
* @apiPermission none
* @apiSampleRequest off
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    {
*       "counter": {
*          "id": "1",
*          "trigger": "chapterCompletion",
*          "chapterId": "chapter1",
*          "counter": 3,
*          "createdAt": "2017-12-20T16:17:10.000Z",
*          "updatedAt": "2017-12-20T16:17:10.000Z"
*        }
*     }
*/
router.post('/', requireAuth, async ctx => {
  const newCounter = ctx.request.body.counter;
  let counter;
  try {
    // counter = await Counter.query().patch(newCounter).where({ chapterId: newCounter.chapterId, trigger: newCounter.trigger });
    counter = await Counter.query().insertAndFetch(newCounter);
  } catch (e) {
    ctx.throw(400, null, { errors: [e.message] });
  }

  ctx.status = 201;
  ctx.body = { counter };
});


/**
* @api {put} /api/v1/counters/:id PUT a view counter.
* @apiName PutViewCounters
* @apiGroup ViewCounters
*
* @apiParam {string} counter[trigger] optional preset triggers
* @apiParam {string} counter[chapterId] optional chapter id
* @apiParam {string} counter[counter] optional integer counter
*
* @apiPermission none
* @apiSampleRequest off
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "counter": {
*         "id": "2",
*         "trigger": "chapterCompletion",
*         "chapterId": "chapter1",
*         "counter": 3,
*         "createdAt": "2017-12-20T16:17:10.000Z",
*         "updatedAt": "2017-12-20T16:17:10.000Z"
*       }
*   }
*/
router.put('/:id', requireAuth, async ctx => {
  let putCounter = ctx.request.body.counter;
  const counter_record = await Counter.query().findById(ctx.params.id);
  ctx.assert(counter_record, 401, 'No ID was found');
  const achievement = await Counter.query().patchAndFetchById(ctx.params.id, putCounter);

  ctx.status = 201;
  ctx.body = { achievement };
});


/**
* @api {delete} /api/v1/counters/:id DELETE a view counter.
* @apiName DeleteViewCounters
* @apiGroup ViewCounters
*
* @apiPermission none
* @apiSampleRequest off
*

*
* @apiSuccessExample {json} Success-Response:
*     HTTP/1.1 200 OK
*    {
*      "counter": {
*         "id": "2",
*         "trigger": "chapterCompletion",
*         "chapterId": "chapter1",
*         "counter": 3,
*         "createdAt": "2017-12-20T16:17:10.000Z",
*         "updatedAt": "2017-12-20T16:17:10.000Z"
*       }
*   }
*/

router.delete('/:id', requireAuth, async ctx => {
  const counter = await Counter.query().findById(ctx.params.id);
  ctx.assert(counter, 401, 'No ID was found');
  await Counter.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { counter };
});


module.exports = router.routes();
