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

  const course_data = ctx.request.body.enrollment;
  course_data.user_id = ctx.state.user.data.id;

  //  check for existing courseID record
  let enrollments_base = Enrollments.query();
  const enrollments_record = await enrollments_base.where({ 'course_id': course_data.course_id, 'user_id': course_data.user_id });
  const enrollment_id = enrollments_record[0].id;


  let enrollment_body;
  try {
    // Patch data if record exists
    if (enrollment_id != undefined) {
      const patch_enrollments_base = await enrollments_base.patchAndFetchById(enrollment_id, course_data);
      enrollment_body = patch_enrollments_base;
    } else {
      // Creates new entry if record ID does not exist
      const enrollments = await enrollments_base.insertAndFetch({ 'course_id': course_data.course_id, 'user_id': course_data.user_id, 'status': true });
      enrollment_body = enrollments;
    }
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message, 'Bad Request'] }); }
    throw e;
  }
  ctx.status = 201;
  ctx.body = { enrollment_body };
});


router.put('/:id', requireAuth, async ctx => {
  let course_data = ctx.request.body.enrollment;
  course_data.userId = ctx.state.user.data.id;

  //  check for existing chapter and user record and return error if it does not exist
  let enrollments_record = await Enrollments.query().findById(ctx.params.id);
  if (!enrollments_record) {
    ctx.throw(400, null, { errors: ['Bad Request'] });
  }

  // Patch data if record exists
  let enrollment;
  try {
    enrollment = await Enrollments.query().patchAndFetchById(ctx.params.id, course_data);

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message, 'Bad Request'] }); }
    throw e;
  }

  ctx.status = 201;
  ctx.body = { enrollment };
});

router.get('/', requireAuth, async ctx => {
  let enrollment;
  try {
    enrollment = await Enrollments.query().where({ 'user_id': ctx.state.user.data.id });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }

  ctx.status = 201;
  ctx.body = { enrollment };
});

router.get('/:id', requireAuth, async ctx => {
  let enrollment;
  try {
    enrollment = await Enrollments.query().findById(ctx.params.id);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }

  ctx.status = 201;
  ctx.body = { enrollment };
});

router.get('/user', requireAuth, async ctx => {
  let user;
  try {
    user = await User.query().where(ctx.query).eager('enrolledCourses(selectNameAndId)');
    enrolledCoursesType(user);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad request'] }); }
    throw e;
  }

  ctx.status = 201;
  ctx.body = { user };

});

module.exports = router.routes();