const Router = require('koa-router');
const Questionnaire = require('../models/questionnaire');
const permController = require('../middleware/permController');

const router = new Router({
  prefix: '/questionnaire'
});


router.get('/', permController.requireAuth, async ctx =>{
  try {
    const postQ = await Questionnaire.query();

    ctx.status = 200;
    ctx.body = { postQ };

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});

module.exports = router.routes();