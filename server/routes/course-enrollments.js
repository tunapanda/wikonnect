const Router = require('koa-router');
const { UniqueViolationError, ConstraintViolationError, ForeignKeyViolationError } = require('objection');

const CourseEnrolledModel = require('../models/course-enrollment');
const { requireAuth } = require('../middleware/permController');
const log = require('../utils/logger');


const router = new Router({
  prefix: '/course-enrollments'
});

/**
 * @api {get} /api/v1/course-enrollments GET all course enrollments
 * @apiName Get all user course enrollments
 * @apiGroup Courses Enrollment
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Query Params) {String} [include] relationships to eager load (comma separated e.g. course,user)
 *
 * @apiSuccess {Object}  courseEnrollment Top level object
 * @apiSuccess {String}  courseEnrollment[id] the id of the course enrollment
 * @apiSuccess {String}  courseEnrollment[courseId] the id of the course user has enrolled to
 * @apiSuccess {String}  courseEnrollment[userId] the id of the user
 * @apiSuccess {String}  courseEnrollment[createdAt] date course enrollment was created
 * @apiSuccess {String}  courseEnrollment[updatedAt] date course enrollment was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "courseEnrollments":[{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "courseId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }]
 *            }
 */
router.get('/', requireAuth, async ctx => {

  try {
    let graphFetchQuery = '';
    if (ctx.query && ctx.query.include) { //TODO: move this stuff to Joi validator
      const includes = ctx.query.include.split(',');
      if (includes.some((v) => v.toLowerCase().includes('course'))) {
        graphFetchQuery += 'course.[tags,creator(selectBasicInfo)]';
      }
      if (includes.some((v) => v.toLowerCase().includes('user'))) {
        graphFetchQuery += ',user(selectBasicInfo)';
      }
    }
    delete ctx.query.include;

    const courseEnrollments = await CourseEnrolledModel.query()
      .withGraphFetched(`[${graphFetchQuery}]`)
      .where(ctx.query);
    ctx.status = 200;
    ctx.body = { courseEnrollments };
  } catch (e) {
    log.error(e);
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {post} /api/v1/course-enrollments POST course enrollment
 * @apiName POST user course enrollment
 * @apiGroup Courses Enrolled
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 *
 * @apiParam (Request Body)  {Object}  courseEnrollment Top level object
 * @apiParam (Request Body)  {String}  courseEnrollment[courseId] Id of the course to enroll to
 * @apiParam (Request Body)  {String}  [courseEnrollment[userId]=JWTToken.user.id] Id of the user enrolling.
 *
 * @apiSuccess {Object}  courseEnrollment Top level object
 * @apiSuccess {String}  courseEnrollment[id] the id of the course enrollment
 * @apiSuccess {String}  courseEnrollment[courseId] the id of the course user has enrolled to
 * @apiSuccess {String}  courseEnrollment[userId] the id of the user
 * @apiSuccess {String}  courseEnrollment[createdAt] date course enrollment was created
 * @apiSuccess {String}  courseEnrollment[updatedAt] date course enrollment was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "courseEnrollment":{
 *              "id": "JBp56KQAA7c",
 *              "userId": "user1",
 *              "courseId": "JB0yRrGAAd0",
 *              "createdAt": "2021-06-23T14:16:56.796Z",
 *              "updatedAt": "2021-06-23T14:16:56.796Z"
 *              }
 *            }
 *
 */
router.post('/', requireAuth, async ctx => {

  const creatorId = ctx.state.user.data.id;
  const obj = ctx.request.body.courseEnrollment;

  ctx.assert(obj && obj.courseId, 400, 'Invalid course identifier provided');

  try {

    const courseEnrollment = await CourseEnrolledModel.query()
      .insertAndFetch({ userId: creatorId, courseId: obj.courseId });
    ctx.status = 201;
    ctx.body = { courseEnrollment };
  } catch (e) {
    log.error(e);
    if (e instanceof UniqueViolationError) {
      ctx.throw(400, null, { errors: ['User already enrolled'] });
    }
    if (e instanceof ForeignKeyViolationError) {
      ctx.throw(400, null, { errors: ['Data provided is invalid'] });
    }
    if (e instanceof ConstraintViolationError) {
      ctx.throw(400, null, { errors: ['Data provided is invalid'] });
    }
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {delete} /api/v1/course-enrollments/:id Delete course enrollment
 * @apiName DELETE course enrollment by Id
 * @apiGroup Courses Enrolled
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Course enrollment Id
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const obj = await CourseEnrolledModel.query()
    .findById(ctx.params.id);

  ctx.assert(obj, 404, 'Course enrollment not found');

  try {
    await obj.$query().delete();
    ctx.status = 200;
    ctx.body = {};
  } catch (e) {
    log.error(e);
  }

});


module.exports = router.routes();
