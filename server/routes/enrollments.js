const Router = require('koa-router');
const User = require('../models/user');
const Enrollments = require('../models/enrollment');
const { requireAuth } = require('../middleware/permController');




const router = new Router({
  prefix: '/enrollments'
});


router.post('/', requireAuth, async ctx => {
  /**
   * enroll = {
   *    courses_id => string,
   *    user_id => string
   * }
   */
  const enrollments = await Enrollments.query().insertAndFetch(ctx.query);
  ctx.status = 200;
  ctx.body = { enrollments };
});

router.get('/', requireAuth, async ctx => {
  const enrollment = await Enrollments.query().where({ 'user_id': ctx.state.user.data.id});
  ctx.status = 200;
  ctx.body = { enrollment };
});

router.get('/user', requireAuth, async ctx => {
  const user = await User.query().where(ctx.query).eager('enrolledCourses(selectNameAndId)');
  console.log(user[0].enrolledCourses);

  ctx.status = 200;
  ctx.body = { user };

});

module.exports = router.routes();