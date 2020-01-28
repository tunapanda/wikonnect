const Router = require('koa-router');
const User = require('../models/user');
const { requireAuth } = require('../middleware/permController');




const router = new Router({
  prefix: '/enrollments'
});


router.get('/', requireAuth, async ctx => {
  const user = await User.query().where(ctx.query).eager('enrolledCourses(selectNameAndId)');
  console.log(user[0].enrolledCourses);

  ctx.status = 200;
  ctx.body = { user };

});

module.exports = router.routes();