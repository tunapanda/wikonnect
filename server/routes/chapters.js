const Router = require('koa-router');
const Chapter = require('../models/chapter');

const router = new Router({
  prefix: '/chapter'
});

router.get('/', async ctx => {
  const chapter = await Chapter.query();
  ctx.status = 200;
  ctx.body = { chapter };
});
router.post();
router.put();
router.delete();
