const Router = require('koa-router');
const Course = require('../models/course');
const permController = require('../middleware/permController');
const { userPermissions } = require('../middleware/_helpers/roles');
const { validateCourses } = require('../middleware/validation/validatePostData');
const { userProgress, returnType, insertType, userEnrollmentType } = require('../utils/userProgress/coursesPogress');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const router = new Router({
  prefix: '/courses'
});


/**
 * @api {get} /courses/ GET all courses.
 * @apiName GetCourses
 * @apiGroup Courses
 * @apiPermission none
 *
 * @apiSampleRequest off
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     "course": [
 *         {
 *           "id": "course1",
 *           "name": "A Course",
 *           "slug": "a-course",
 *           "description": "Contains Modules.",
 *           "status": "published",
 *           "creatorId": "user1",
 *           "createdAt": "2017-12-20T19:17:10.000Z",
 *           "updatedAt": "2017-12-20T19:17:10.000Z",
 *           "modules": [
 *             {
 *               "id": "module1",
 *               "name": "A Module",
 *               "type": "modules"
 *             }
 *           ],
 *           "enrollments": [
 *              {
 *                "id": "enrollment1",
 *                "courseId": "course1",
 *                "status": "true",
 *                "type": "enrollments"
 *              }
 *            ],
 *            "progress": 75,
 *            "permission": {
 *              "read": "boolean",
 *              "update": "boolean",
 *              "create": "boolean",
 *              "delete": "boolean"
 *            }
 *         }
 *       ]
 * @apiError {String} errors Bad Request.
 */


router.get('/', permController.requireAuth, async ctx => {
  try {
    const course = await Course.query().where(ctx.query).eager('[modules(selectNameAndId), enrollments(selectNameAndId)]');
    if (ctx.state.user.data.id !== 'anonymous') {
      // get all achievements of a user
      await userProgress(course, ctx.state.user.data.id);
    }
    userEnrollmentType(course);
    returnType(course);

    course.forEach(child => {
      Object.keys(userPermissions)
        .forEach(perm => {
          if (!ctx.state.user) {
            userPermissions.read = 'true';
            userPermissions.update = 'false';
            userPermissions.delete = 'false';
            userPermissions.create = 'false';
          } else if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
            userPermissions[perm] = 'true';
          } else if (ctx.state.user.data.id === child.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
            userPermissions[perm] = 'true';
            userPermissions.delete = 'false';
          } else if (ctx.state.user.data.id != child.creatorId) {
            userPermissions.read = 'true';
            userPermissions.update = 'false';
            userPermissions.create = 'false';
            userPermissions.delete = 'false';
          } else if (child.status === 'draft' && ctx.state.user.data.id === child.creatorId) {
            userPermissions.read = 'true';
            userPermissions.update = 'true';
          }
          child.permission = userPermissions;
        });
    });

    ctx.status = 200;
    ctx.body = { course };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, { message: 'The query key does not exist' });
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});



/**
 * @api {get} /courses/:id GET single course.
 * @apiName GetACourse
 * @apiGroup Courses
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "course": {
 *        "id": "course1",
 *        "name": "A Course",
 *        "slug": "a-course",
 *        "description": "Contains Modules.",
 *        "status": "published",
 *        "creatorId": "user1",
 *        "createdAt": "2017-12-20T19:17:10.000Z",
 *        "updatedAt": "2017-12-20T19:17:10.000Z",
 *        "modules": [
 *          {
 *            "id": "module1",
 *            "name": "A Module",
 *            "type": "modules"
 *          }
 *        ]
 *      }
 *    }
 *
 * @apiError {String} errors Bad Request.
 */

router.get('/:id', permController.requireAuth, async ctx => {
  const course = await Course.query().findById(ctx.params.id).eager('modules(selectNameAndId)');
  ctx.assert(course, 404, 'no lesson by that ID');

  await returnType(course);

  async function permObjects() {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (!ctx.state.user) {
          userPermissions.read = 'true';
          userPermissions.update = 'false';
          userPermissions.delete = 'false';
          userPermissions.create = 'false';
        } else if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        } else if (ctx.state.user.data.role.toLowerCase() == 'admin' && ctx.state.user.data.id != course.creatorId) {
          userPermissions[perm] = 'true';
          userPermissions.update = 'false';
          userPermissions.create = 'false';
          userPermissions.delete = 'false';
        } else if (ctx.state.user.data.id === course.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        } else if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
        } else {
          userPermissions.read = 'true';
          userPermissions.update = 'false';
          userPermissions.delete = 'false';
          userPermissions.create = 'false';
        }

      });
    return course.permissions = userPermissions;
  }
  ctx.status = 200;
  course['permissions'] = await permObjects();
  ctx.body = { course };
});


/**
 * @api {post} /courses POST course.
 * @apiName PostACourse
 * @apiGroup Courses
 * @apiPermission none
 *
 * @apiParam (Post Params) {String} course[name] Name - Unique.
 * @apiParam (Post Params) {String} course[slug] Slug - Unique and autogenerated.
 * @apiParam (Post Params) {String} course[description] Description.
 * @apiParam (Post Params) {String} course[status] Courses status - published | draft .
 * @apiParam (Post Params) {String} course[creatorId] Id of the User.
 *
 * @apiSampleRequest off
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *      "course": {
 *        "name": "A Course",
 *        "slug": "a-course",
 *        "description": "Contains Modules.",
 *        "status": "published",
 *        "creatorId": "user1",
 *      }
 *    }
 *
 * @apiError {String} errors Bad Request.
 *
 */

router.post('/', permController.requireAuth, permController.grantAccess('createAny', 'path'), validateCourses, async ctx => {
  let newCourse = ctx.request.body.course;
  let course = await Course.query().insertAndFetch(newCourse);

  async function permObjects() {
    Object.keys(userPermissions)
      .forEach(perm => {
        if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
          userPermissions[perm] = 'true';
        }
        if (ctx.state.user.data.id === course.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
          userPermissions[perm] = 'true';
          userPermissions.delete = 'false';
        }
        if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
          userPermissions.read = 'true';
          userPermissions.update = 'true';
        }
      });
    return course.permissions = userPermissions;
  }

  ctx.status = 201;
  course['permissions'] = await permObjects();
  ctx.body = { course };
});

/**
 * @api {put} /courses/:id PUT course.
 * @apiName PutACourse
 * @apiGroup Courses
 * @apiPermission [admin, teacher, superadmin]
 *
 * @apiParam (Put Params) {String} course[name] Optional Name Unique.
 * @apiParam (Put Params) {String} course[slug] Optional Slug is Unique and autogenerated.
 * @apiParam (Put Params) {String} course[description] Optional Description.
 * @apiParam (Put Params) {String} course[status] Course status[published or draft]
 *
 * @apiSampleRequest off
 *
 * @apiSuccess {String} course[object] Object data
 * @apiError {String} errors Bad Request.
 *
 */

router.put('/:id', permController.requireAuth, permController.grantAccess('createAny', 'path'), async ctx => {
  let { modules, ...newCourse } = ctx.request.body.course;

  let course;
  try {
    course = await Course.query().patchAndFetchById(ctx.params.id, newCourse);
    ctx.assert(course, 404, 'Not Found');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request', e.message] }); }
    throw e;
  }

  await knex('course_modules').where({ 'course_id': course.id }).del();
  insertType('course_modules', modules, course.id);

  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
      if (ctx.state.user.data.id === course.creatorId || ctx.state.user.data.role.toLowerCase() == 'admin') {
        userPermissions[perm] = 'true';
        userPermissions.delete = 'false';
      }
      if (course.status === 'draft' && ctx.state.user.data.id === course.creatorId) {
        userPermissions.read = 'true';
        userPermissions.update = 'true';
      }
    });

  ctx.status = 201;
  course['permissions'] = userPermissions;
  ctx.body = { course };
});


/**
 * @api {delete} /courses/:id DELETE course.
 * @apiName DeleteACourse
 * @apiGroup Courses
 * @apiPermission [admin, superadmin]
 *
 * @apiSuccess {String} course[object] Object data
 * @apiError {String} errors Bad Request.
 */


router.delete('/:id', permController.requireAuth, permController.grantAccess('deleteOwn', 'path'), async ctx => {
  const course = await Course.query().findById(ctx.params.id);
  await Course.query().delete().where({ id: ctx.params.id });

  ctx.assert(course, 401, 'No ID was found');
  Object.keys(userPermissions)
    .forEach(perm => {
      if (ctx.state.user.data.role.toLowerCase() == 'superadmin') {
        userPermissions[perm] = 'true';
      }
    });

  ctx.status = 200;
  course['permissions'] = userPermissions;
  ctx.body = { course };
});

// router.post('/enrollment', async ctx => {
//   try {

//   } catch (e) {
//     if (e.statusCode) {
//       ctx.throw(e.statusCode, null, { errors: [e.message] });
//     } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
//     throw e;
//   }
// });
module.exports = router.routes();
