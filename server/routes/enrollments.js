const Router = require('koa-router');
const User = require('../models/user');
const Enrollments = require('../models/enrollment');
const { requireAuth } = require('../middleware/permController');

const log = require('../utils/logger');

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
  } catch (e) {
    log.error({ errors: ['No enrolled courses type'] });
  }
}


router.post('/', requireAuth, async ctx => {

  const course_data = ctx.request.body.enrollment;
  course_data.user_id = ctx.state.user.data.id;
  delete course_data.courseId;

  //  check for existing courseID record
  let enrollments_base = Enrollments.query();
  const enrollments_record = await enrollments_base.where({ 'course_id': course_data.course_id, 'user_id': course_data.user_id });

  let enrollment;
  try {
    // Patch data if record exists
    if (enrollments_record.length) {
      const patch_enrollments_base = await enrollments_base.patchAndFetchById(enrollments_record[0].id, course_data);
      enrollment = patch_enrollments_base;
    } else {
      // Creates new entry if record ID does not exist
      const enrollments = await enrollments_base.insertAndFetch({ 'course_id': course_data.course_id, 'user_id': course_data.user_id, 'status': true });
      enrollment = enrollments;
    }
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.status = 201;

  ctx.body = { enrollment };
});


router.put('/:id', requireAuth, async ctx => {
  let course_data = ctx.request.body.enrollment;
  course_data.userId = ctx.state.user.data.id;

  let enrollment_query = Enrollments.query();

  //  check for existing chapter and user record and return error if it does not exist
  const enrollments_record = await enrollment_query.findById(ctx.params.id);
  if (!enrollments_record) {
    ctx.throw(400, null, { errors: ['Bad Request'] });
  }

  // Patch data if record exists
  try {
    const enrollment = await enrollment_query.patchAndFetchById(ctx.params.id, course_data);
    ctx.status = 201;
    ctx.body = { enrollment };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message, 'Bad Request'] }); }
    throw e;
  }

});

router.get('/', requireAuth, async ctx => {
  try {
    const enrollment = await Enrollments.query().where({ 'user_id': ctx.state.user.data.id });
    ctx.status = 201;
    ctx.body = { enrollment };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }

});

router.get('/:id', requireAuth, async ctx => {
  try {
    const enrollment = await Enrollments.query().findById(ctx.params.id);
    ctx.status = 201;
    ctx.body = { enrollment };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }
});

router.get('/user', requireAuth, async ctx => {
  try {
    const user = await User.query().where(ctx.query).eager('enrolledCourses(selectNameAndId)');
    enrolledCoursesType(user);
    ctx.status = 201;
    ctx.body = { user };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }
});

module.exports = router.routes();