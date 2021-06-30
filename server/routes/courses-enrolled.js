const Router = require('koa-router');
const { UniqueViolationError, ConstraintViolationError, ForeignKeyViolationError } = require('objection');

const CourseEnrolledModel = require('../models/course-enrollment');
const { requireAuth } = require('../middleware/permController');
const log = require('../utils/logger');


const router = new Router({
  prefix: '/courses-enrolled'
});

/**
 * @api {get} /api/v1/courses-enrolled GET all user course enrollments
 * @apiName Get all user course enrollments
 * @apiGroup Courses Enrolled
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Query Params) {String} [include] relationships to eager load (comma separated e.g. course,user)
 *
 * @apiSuccess {Object}  coursesEnrolled Top level object
 * @apiSuccess {String}  coursesEnrolled[id] the id of the course enrollment
 * @apiSuccess {String}  coursesEnrolled[courseId] the id of the course user has enrolled to
 * @apiSuccess {String}  coursesEnrolled[userId] the id of the user
 * @apiSuccess {String}  coursesEnrolled[createdAt] date course enrollment was created
 * @apiSuccess {String}  coursesEnrolled[updatedAt] date course enrollment was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "coursesEnrolled":[{
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
    let joinQuery = '';
    if(ctx.query && ctx.query.include){ //TODO: move this stuff to Joi validator
      const includes = ctx.query.include.split(',');
      if(includes.some((v)=>v.toLowerCase().includes('course'))){
        joinQuery += 'course';
      }
      if(includes.some((v)=>v.toLowerCase().includes('user'))){
        joinQuery += ',user(selectBasicInfo)';
      }
    }
    const coursesEnrolled = await CourseEnrolledModel.query()
      .withGraphJoined(`[${joinQuery}]`)
      .where((query)=>{
        if(ctx.query.userId){
          query.where('userId',ctx.query.userId);
        }
      },);
    ctx.status = 200;
    ctx.body = { coursesEnrolled };
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
 * @api {post} /api/v1/courses-enrolled POST course enrollment
 * @apiName POST user course enrollment
 * @apiGroup Courses Enrolled
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 *
 * @apiParam (Request Body)  {Object}  coursesEnrolled Top level object
 * @apiParam (Request Body)  {String}  coursesEnrolled[courseId] Id of the course to enroll to
 * @apiParam (Request Body)  {String}  [coursesEnrolled[userId]=JWTToken.user.id] Id of the user enrolling.
 *
 * @apiSuccess {Object}  coursesEnrolled Top level object
 * @apiSuccess {String}  coursesEnrolled[id] the id of the course enrollment
 * @apiSuccess {String}  coursesEnrolled[courseId] the id of the course user has enrolled to
 * @apiSuccess {String}  coursesEnrolled[userId] the id of the user
 * @apiSuccess {String}  coursesEnrolled[createdAt] date course enrollment was created
 * @apiSuccess {String}  coursesEnrolled[updatedAt] date course enrollment was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "coursesEnrolled":{
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
  const obj = ctx.request.body.coursesEnrolled;

  ctx.assert(obj && obj.courseId, 400, 'Invalid course identifier provided');

  try {

    const coursesEnrolled = await CourseEnrolledModel.query()
      .insertAndFetch({ userId: creatorId, courseId: obj.courseId });
    ctx.status = 201;
    ctx.body = { coursesEnrolled };
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
 * @api {delete} /api/v1/courses-enrolled/:id Delete course enrollment
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
