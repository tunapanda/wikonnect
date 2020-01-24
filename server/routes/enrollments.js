const Router = require('koa-router');
const User = require('../models/user');
const Enrollments = require('../models/enrollment');
const { requireAuth } = require('../middleware/permController');

const router = new Router({
  prefix: '/enrollments'
});


async function enrolledCoursesType(parent) {
  try {
    if (parent.length == undefined) {
      parent.enrolledCourses.forEach(lesson => {
        return lesson.type = 'course';
      });
    } else {
      parent.forEach(mod => {
        mod.enrolledCourses.forEach(lesson => {
          return lesson.type = 'course';
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
}


router.post('/', requireAuth, async ctx => {
  const courseId = ctx.request.body.enrollment.course_id;
  const userId = ctx.state.user.data.id;
  /**
   * enroll = {
   *    course_id => string,
   *    user_id => string
   * }
   */

  //  check for existing courseID record
  let enrollments_base = await Enrollments.query();
  const enrollments_record = enrollments.findById(courseId);

  if (enrollments_record.length) {
    ctx.throw(400, null, { errors: ['Bad Request'] });
  }

  // create new entry if courseId does not exist
  let enrollments;
  try {
    enrollments = await enrollments_base.insertAndFetch({ 'course_id': courseId, 'user_id': userId });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = { enrollments };
});


router.delete('/', requireAuth, async ctx => {
  const courseId = ctx.request.body.enrollment.course_id;
  const userId = ctx.state.user.data.id;
  /**
   * enroll = {
   *    course_id => string,
   *    user_id => string
   * }
   */

  //  check for existing courseID record and return error if it does not exist
  const enrollments_record = await Enrollments.query().findById(courseId);

  if (!enrollments_record) {
    ctx.throw(400, null, { errors: ['Bad Request'] });
  }

  // delete new entry if courseId does not exist
  try {
    await Enrollments.query().delete().where({ 'course_id': courseId, 'user_id': userId });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

  ctx.status = 200;
  ctx.body = { enrollments_record };
});

router.get('/', requireAuth, async ctx => {
  let enrollment;
  try {
    enrollment = await Enrollments.query().where({ 'user_id': ctx.state.user.data.id });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, {errors: [e.message]});
    } else { ctx.throw(400, null, { errors: ['Bad request']});}
    throw e;
  }

  ctx.status = 200;
  ctx.body = { enrollment };
});

router.get('/user', requireAuth, async ctx => {
  let user;
  try {
    user = await User.query().where(ctx.query).eager('enrolledCourses(selectNameAndId)');
    enrolledCoursesType(user);
    ctx.status = 200;
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }

  ctx.body = { user };

});

module.exports = router.routes();