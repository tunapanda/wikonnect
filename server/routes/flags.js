const Router = require('koa-router');
const log = require('../utils/logger');
const Flag = require('../models/flag');
const { requireAuth, grantAccess } = require('../middleware/permController');

const router = new Router({
  prefix: '/flags'
});


router.get('/:id', requireAuth, grantAccess('readAny', 'path'), async ctx => {
  const flag = await Flag.query().findById(ctx.params.id);

  ctx.assert(flag, 404, 'no lesson by that ID');
  log.error('The user path accessed does not exist');

  ctx.status = 200;
  ctx.body = { flag };
});


router.get('/', requireAuth, grantAccess('readAny', 'path'), async ctx => {

  let flags;
  try {
    flags = await Flag.query().where(ctx.query);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.assert(flags, 401, 'Something went wrong');


  ctx.status = 200;
  ctx.body = { flags };

});

//router.post('/', requireAuth, grantAccess('createAny', 'path'), async ctx => {
router.post('/', async ctx => {

  let newFLag = ctx.request.body.flag;

  try {
    const flag = await Flag.query().insertAndFetch(newFLag);

    ctx.assert(flag, 401, 'Something went wrong');
    ctx.status = 201;
    ctx.body = { flag };

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});


router.put('/:id', requireAuth, grantAccess('updateOwn', 'path'), async ctx => {
  let newFlag = ctx.request.body.flag;
  const checkFlag = await Flag.query().findById(ctx.params.id);

  if (!checkFlag) {
    ctx.log.info('Error, path does not exists  %s for %s', ctx.request.ip, ctx.path);
    ctx.throw(400, 'That lesson path does not exist');
  }

  const lesson = await Flag.query().patchAndFetchById(ctx.params.id, newFlag);

  ctx.status = 201;
  ctx.body = { lesson };

});

router.delete('/:id', grantAccess('deleteOwn', 'path'), async ctx => {
  const flag = await Flag.query().findById(ctx.params.id);

  if (!flag) {
    ctx.throw(401, 'No record with id');
  }
  await Flag.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { flag };
});

module.exports = router.routes();
