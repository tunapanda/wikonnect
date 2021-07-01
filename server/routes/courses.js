const path = require('path');
const fs = require('fs');

const Router = require('koa-router');
const { UniqueViolationError, ConstraintViolationError, ForeignKeyViolationError } = require('objection');
const { nanoid } = require('nanoid/async');
const sharp = require('sharp');
const koaBody = require('koa-body')({ multipart: true, multiples: false, keepExtensions: true });

const CourseModel = require('../models/course');
const { requireAuth } = require('../middleware/permController');
const slugify = require('../utils/slugGen');
const s3 = require('../utils/s3Util');
const log = require('../utils/logger');
const { getProfileImage } = require('../utils/routesUtils/userRouteUtils');


const router = new Router({
  prefix: '/courses'
});

/**
 * @api {get} /api/v1/courses/:id GET course by Id
 * @apiName Get a course by Id
 * @apiGroup Courses
 * @apiPermission [authenticated user]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} [Authorization] Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id tag id
 *
 *
 * @apiSuccess {Object}  course Top level object
 * @apiSuccess {String}  course[id] the id of the course
 * @apiSuccess {String}  course[name] the name of the course
 * @apiSuccess {String}  course[slug] user friendly course url pathname
 * @apiSuccess {String}  course[description] A short course description
 * @apiSuccess {String}  course[status] <strong>published</strong> or <strong> draft</strong>
 * @apiSuccess {String}  course[thumbnailUrl] course image url
 * @apiSuccess {String}  course[totalEnrolled] total users enrolled to the course
 * @apiSuccess {Object}  course[tags]=null Tags tied to the course. Refer to the tag object properties
 * @apiSuccess {Object}  course[playlist]=null Chapters in the course playlist + rank.
 * @apiSuccess {String}  course[type]=course
 * @apiSuccess {String}  course[metadata]=null
 * @apiSuccess {String}  course[creatorId] Id of the user who created the tag
 * @apiSuccess {String}  course[createdAt] date course was created
 * @apiSuccess {String}  course[updatedAt] date course was updated
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "course":{
 *              "id": "JBp56KQAA7c",
 *              "name": "A sample course",
 *              "slug": "a-sample-course",
 *              "description": "This is a demo description d",
 *              "status": "publish",
 *              "creatorId": "user1",
 *              "metadata": null,
 *              "createdAt": "2021-06-22T07:14:21.079Z",
 *              "updatedAt": "2021-06-22T07:55:24.615Z",
 *              "thumbnailUrl": "/uploads/images/courses/HaKKzfAN03D.jpg",
 *              "totalEnrolled": "0",
 *              "type": "course"
 *              "tags":[{"id": "JBpWJMOAAnE", "name": "Internet Basics", "slug": "internet-basics".....}],
 *              "playlist":[{"id": "JBpWJJeAAbg", "status": "published","name": "dolorem eaque sint",…]
 *              }
 *            }
 *
 */
router.get('/:id', requireAuth, async (ctx) => {
  try {
    const course = await CourseModel.query()
      .select(['*',
        CourseModel.relatedQuery('courseEnrollments').count().as('totalEnrolled'),
      ])
      .withGraphFetched('[tags,playlist,playlist.reaction(reactionAggregate),creator(selectBasicInfo)]')
      .withGraphFetched('[playlist.author(selectBasicInfo)]')     //have to place it here for it to work.
      .findById(ctx.params.id);

    ctx.assert(course, 404, { message: 'Course not found' });

    /** fetch correct user image for the chapter(s) authors**/
    const creators = [];
    let creatorIds = {}; //quicker to get unique items
    for (let i = 0; i < course.playlist.length; i++) {
      if (!course.playlist[i].author) {
        continue;
      }
      if (!creatorIds[course.playlist[i].author.id]) {
        creators.push(course.playlist[i].author);
        creatorIds[course.playlist[i].author.id] = true;
      }
    }
    if (!creatorIds[course.creator.id]) {
      creators.push(course.creator); //push also the course creator profile
    }

    const promises = creators.map(async (user) => {
      return {
        id: user.id,
        name: user.name,
        profileUri: await getProfileImage(user)
      };
    });
    const userProfiles = await Promise.all(promises);
    //now map above profiles with courses
    course.playlist = course.playlist.map((chapter) => {
      if (!chapter.author) {
        //just in case 😁
        chapter.author = anonymousProfile();
        return chapter;
      }
      const profile = userProfiles.find((p) => p.id === chapter.author.id);
      if (profile) {
        chapter.author = profile;
      } else {
        //just in case 👽
        chapter.author = anonymousProfile();
      }
      return chapter;
    });

    //resolve the course creator profile
    const courseCreatorProfile = userProfiles.find((p) => p.id === course.creator.id);

    course.creator = courseCreatorProfile ? courseCreatorProfile : anonymousProfile();

    ctx.status = 200;
    ctx.body = { course };
  } catch (e) {
    log.error(e);
  }
});

/**
 * @api {get} /api/v1/courses GET all courses
 * @apiName Get all courses
 * @apiGroup Courses
 * @apiPermission [authenticated user]
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} [Authorization] Bearer << JWT here>>
 *
 * @apiParam (Query Params) {String}   [id] specified course id to filter with
 * @apiParam (Query Params) {String}   [name]  specified course name to filter with
 * @apiParam (Query Params) {String}   [slug]  filter with user friendly course url pathname
 * @apiParam (Query Params) {String}   [status]  filter with course status i.e. published or draft
 * @apiParam (Query Params) {String}   [creatorId]  filter tags by course author Id
 * @apiParam (Query Params) {String}   [include=tags,creator]  relations to include in response separated with a comma (e.g. enrollment)
 * @apiParam (Query Params) {String}   [enrolledUserId] filter enrollments by this userId. The include query param must request `enrollment` e.g. /?include=enrollment&enrolledUserId=user1
 *
 *
 * @apiSuccess {Object}  courses Top level object                                                             
 * @apiSuccess {String}  course[id] the id of the course                                                     
 * @apiSuccess {String}  course[name] the name of the course                                                 
 * @apiSuccess {String}  course[slug] user friendly course url pathname                                      
 * @apiSuccess {String}  course[description] A short course description                                      
 * @apiSuccess {String}  course[status] <strong>published</strong> or <strong> draft</strong>                
 * @apiSuccess {String}  course[thumbnailUrl] course image url
 * @apiSuccess {String}  course[totalEnrolled] total users enrolled to the course
 * @apiSuccess {Object}  course[tags]=null Tags tied to the course. Refer to the tag object for properties
 * @apiSuccess {String}  course[type]=course                                                                 
 * @apiSuccess {String}  course[metadata]=null                                                               
 * @apiSuccess {String}  course[creatorId] Id of the user who created the tag                                
 * @apiSuccess {String}  course[createdAt] date course was created
 * @apiSuccess {String}  course[updatedAt] date course was updated                                           

 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *             "courses":[{
 *              "id": "JBp56KQAA7c",
 *              "name": "A sample course",
 *              "slug": "a-sample-course",
 *              "description": "This is a demo description d",
 *              "status": "publish",
 *              "creatorId": "user1",
 *              "metadata": null,
 *              "createdAt": "2021-06-22T07:14:21.079Z",
 *              "updatedAt": "2021-06-22T07:55:24.615Z",
 *              "thumbnailUrl": "/uploads/images/courses/HaKKzfAN03D.jpg",
 *              "totalEnrolled": "0",
 *              "type": "course"
 *              "tags":[{"id": "JBpWJMOAAnE", "name": "Internet Basics", "slug": "internet-basics".....}]
 *              }]
 *          }
 *
 */
router.get('/', requireAuth, async (ctx) => {

  try {
    const enrolledUserId = ctx.query.enrolledUserId;
    let queryEnrollment = false;
    if (ctx.query.include) {
      const includes = ctx.query.include.split(',');
      if (includes.some((v) => v.toLowerCase().includes('enrollment'))) {
        queryEnrollment = true;
      }
    }
    delete ctx.query.include;
    delete ctx.query.enrolledUserId;

    let courses = await CourseModel.query()
      .select(['*',
        CourseModel.relatedQuery('courseEnrollments').count().as('totalEnrolled'),
      ])
      .onBuild((query) => {
        if (queryEnrollment) {
          query.withGraphFetched('courseEnrollments');
        }
      })
      .withGraphFetched('[tags,creator(selectBasicInfo)]')
      .where(ctx.query)
      .modifyGraph('courseEnrollments', (query) => {
        if (enrolledUserId) {
          query.where('user_id', enrolledUserId);
        }
      });

    /**retrieve correct user image for the courses**/
    //so not to re-fetch the profile, remove duplicates (handy if network requests to S3 are being done ),
    const creators = [];
    let creatorIds = {}; //quicker to get unique items
    for (let i = 0; i < courses.length; i++) {
      if (!courses[i].creator) {
        continue;
      }
      if (!creatorIds[courses[i].creator.id]) {
        creators.push(courses[i].creator);
        creatorIds[courses[i].creator.id] = true;
      }

    }
    const promises = creators.map(async (user) => {
      return {
        id: user.id,
        name: user.name,
        profileUri: await getProfileImage(user)
      };
    });
    const userProfiles = await Promise.all(promises);
    //now map above profiles with courses
    courses = courses.map((course) => {
      if (!course.creator) {
        //just in case 😁
        course.creator = anonymousProfile();
        return course;
      }
      const profile = userProfiles.find((p) => p.id === course.creator.id);
      if (profile) {
        course.creator = profile;
      } else {
        //just in case 👽
        course.creator = anonymousProfile();
      }
      return course;
    });


    ctx.status = 200;
    ctx.body = { courses };
  } catch (e) {
    log.error(e);
  }
});

/**
 * @api {post} /api/v1/courses POST a course
 * @apiName Post a course
 * @apiGroup Courses
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (Request Body)  {Object}  courses Top level object
 * @apiParam (Request Body)  {String}  course[name] the name of the course
 * @apiParam (Request Body)  {String}  course[slug] user friendly course url pathname
 * @apiParam (Request Body)  {String}  course[description] A short course description
 * @apiParam (Request Body)  {String}  course[status] <strong>published</strong> or <strong> draft</strong>
 * @apiParam (Request Body)  {Object}  course[tags]  Array/object with course tags Ids
 * @apiParam (Request Body)  {Object}  course[playlist]  Array/object with course chapter Ids + respective rank
 *
 * @apiSuccess {Object}  course Top level object
 * @apiSuccess {String}  course[id] the id of the course
 * @apiSuccess {String}  course[name] the name of the course
 * @apiSuccess {String}  course[slug] user friendly course url pathname
 * @apiSuccess {String}  course[description] A short course description
 * @apiSuccess {String}  course[status] <strong>published</strong> or <strong> draft</strong>
 * @apiSuccess {String}  course[thumbnailUrl] course image url
 * @apiSuccess {Object}  course[tags]=null Tags tied to the course. Refer to the tag object for properties
 * @apiSuccess {Object}   course[playlist]=null Chapters in the course playlist and their rank on the playlist.
 * @apiSuccess {String}  course[type]=course
 * @apiSuccess {String}  course[metadata]=null
 * @apiSuccess {String}  course[creatorId] Id of the user who created the tag
 * @apiSuccess {String}  course[createdAt] date course was created
 * @apiSuccess {String}  course[updatedAt] date course was updated
 *
 *
 * @apiExample {json} Sample Request Body:
 *  {
 *    "course":{
 *      "name": "Test course",
 *      "description": "This is a sample description",
 *      "status": "draft",
 *      "tags":[{  "id": "JBpWJMOAAnE"},{  "id":"JBpWJMOAAnI" }],
 *      "playlist":[{"id":"JBpWJJeAAbg","rank":"02"}, {"id":"JBpWJJgAAbo","rank":"01"}]
 *   }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *            "course":{
 *               "id": "JBrs6hiAA7s",
 *               "name": "Test course",
 *               "slug": "test-course",
 *               "description": "This is a sample description",
 *               "status": "draft",
 *               "creatorId": "user1",
 *               "metadata": null,
 *               "createdAt": "2021-06-22T11:25:35.109Z",
 *               "updatedAt": "2021-06-22T11:25:35.109Z",
 *               "thumbnailUrl": "/uploads/images/courses/HaKKzfAN03D.jpg",
 *               "type": "course"
 *               "tags":[{"id": "JBpWJMOAAnE", "name": "Internet Basics", "slug": "internet-basics",…],
 *               "playlist":[{"id": "JBpWJJeAAbg", "status": "published","name": "dolorem eaque sint",…],
 *             }
 *          }
 */
router.post('/', requireAuth, async ctx => {

  try {
    const obj = ctx.request.body.course;
    const creatorId = ctx.state.user.data.id;
    obj.slug = await slugify(obj.name);

    delete obj.thumbnailUrl; //just in case


    const course = await CourseModel.transaction(async tsx => {
      return await CourseModel.query(tsx)
        .insertGraphAndFetch({ ...obj, creatorId }, { relate: true });
    });

    ctx.status = 201;
    ctx.body = { course };
  } catch (e) {
    log.error(e);
    //TODO: have a generic error resolver
    if (e instanceof UniqueViolationError) {
      ctx.throw(400, null, { errors: ['Course already exist'] });
    }
    if (e instanceof ForeignKeyViolationError) {
      ctx.throw(400, null, { errors: ['Course related data invalid'] });
    }
    if (e instanceof ConstraintViolationError) {
      ctx.throw(400, null, { errors: ['Course related data invalid'] });
    }
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {put} /api/v1/courses/:id PUT a course
 * @apiName PUT a course by Id
 * @apiGroup Courses
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the course to update
 *
 * @apiParam (Request Body)  {Object}  courses Top level object
 * @apiParam (Request Body)  {String}  course[name] the name of the course
 * @apiParam (Request Body)  {String}  course[slug] user friendly course url pathname
 * @apiParam (Request Body)  {String}  course[description] A short course description
 * @apiParam (Request Body)  {String}  course[status] <strong>published</strong> or <strong> draft</strong>
 * @apiParam (Request Body)  {Object}  course[tags]  Array/object with course tags Ids
 * @apiParam (Request Body)  {Object}  course[playlist]  Array/object with course chapter Ids
 *
 * @apiSuccess {Object}  course Top level object
 * @apiSuccess {String}  course[id] the id of the course
 * @apiSuccess {String}  course[name] the name of the course
 * @apiSuccess {String}  course[slug] user friendly course url pathname
 * @apiSuccess {String}  course[description] A short course description
 * @apiSuccess {String}  course[status] <strong>published</strong> or <strong> draft</strong>
 * @apiSuccess {String}  course[thumbnailUrl] course image url
 * @apiSuccess {Object}  course[tags]=null Tags tied to the course. Refer to the tag object for properties
 * @apiSuccess {Object}  course[playlist]=null Chapters in the course playlist and their rank on the playlist.
 * @apiSuccess {String}  course[type]=course
 * @apiSuccess {String}  course[metadata]=null
 * @apiSuccess {String}  course[creatorId] Id of the user who created the tag
 * @apiSuccess {String}  course[createdAt] date course was created
 * @apiSuccess {String}  course[updatedAt] date course was updated
 *
 *
 * @apiExample {json} Sample Request Body:
 *  {
 *    "course":{
 *      "name": "Test course",
 *      "description": "This is a sample description",
 *      "status": "draft",
 *      "tags":[{  "id": "JBpWJMOAAnE"},{  "id":"JBpWJMOAAnI" }],
 *      "playlist":[{"id":"JBpWJJeAAbg","rank":"02"}, {"id":"JBpWJJgAAbo","rank":"01"}]
 *   }
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *            "course":{
 *               "id": "JBrs6hiAA7s",
 *               "name": "Test course",
 *               "slug": "test-course",
 *               "description": "This is a sample description",
 *               "status": "draft",
 *               "creatorId": "user1",
 *               "metadata": null,
 *               "createdAt": "2021-06-22T11:25:35.109Z",
 *               "updatedAt": "2021-06-22T11:25:35.109Z",
 *               "thumbnailUrl": "/uploads/images/courses/HaKKzfAN03D.jpg",
 *               "type": "course"
 *               "tags":[{"id": "JBpWJMOAAnE", "name": "Internet Basics", "slug": "internet-basics",…],
 *               "playlist":[{"id": "JBpWJJeAAbg", "status": "published","name": "dolorem eaque sint",…],
 *             }
 *          }
 */
router.put('/:id', requireAuth, async ctx => {

  let obj = ctx.request.body.course;
  ctx.assert(obj, 400, 'Invalid course update request data');

  const oldTag = await CourseModel.query()
    .findById(ctx.params.id);
  ctx.assert(oldTag, 404, 'Course does not exist');

  obj.slug = await slugify(obj.name);
  try {
    const course = await CourseModel.transaction(async tsx => {
      return await CourseModel.query(tsx)
        .upsertGraphAndFetch({ ...obj, id: ctx.params.id }, { relate: true, unrelate: true });
    });

    ctx.status = 200;
    ctx.body = { course };
  } catch (e) {
    log.error(e);
    if (e instanceof UniqueViolationError) {
      ctx.throw(400, null, { errors: ['Course already exist'] });
    }
    if (e instanceof ForeignKeyViolationError) {
      ctx.throw(400, null, { errors: ['Course related data invalid'] });
    }
    if (e instanceof ConstraintViolationError) {
      ctx.throw(400, null, { errors: ['Course related data invalid'] });
    }
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(400, null, { errors: ['Bad Request'] });
    }
  }

});

/**
 * @api {post} /api/v1/courses/:id/thumbnail POST a course thumbnail
 * @apiName Upload a course thumbnail
 * @apiGroup Courses
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the course to update
 *
 * @apiParam (Request Body)  {File}  file File image to update as course thumbnail
 *
 * @apiSuccess {Object}  course Top level object
 * @apiSuccess {String}  course[id] the id of the course
 * @apiSuccess {String}  course[name] the name of the course
 * @apiSuccess {String}  course[slug] user friendly course url pathname
 * @apiSuccess {String}  course[description] A short course description
 * @apiSuccess {String}  course[status] <strong>published</strong> or <strong> draft</strong>
 * @apiSuccess {String}  course[thumbnailUrl] course image url
 * @apiSuccess {String}  course[type]=course
 * @apiSuccess {String}  course[metadata]=null
 * @apiSuccess {String}  course[creatorId] Id of the user who created the tag
 * @apiSuccess {String}  course[createdAt] date course was created
 * @apiSuccess {String}  course[updatedAt] date course was updated
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *          {
 *            "course":{
 *               "id": "JBrs6hiAA7s",
 *               "name": "Test course",
 *               "slug": "test-course",
 *               "description": "This is a sample description",
 *               "status": "draft",
 *               "creatorId": "user1",
 *               "metadata": null,
 *               "thumbnailUrl": "/uploads/images/courses/HaKKzfAN03D.jpg",
 *               "createdAt": "2021-06-22T11:25:35.109Z",
 *               "updatedAt": "2021-06-22T11:25:35.109Z",
 *               "type": "course"
 *             }
 *          }
 */
router.post('/:id/thumbnail', requireAuth, koaBody, async (ctx) => {

  ctx.assert(ctx.request.files.file, 400, 'No file image uploaded');

  const courseObj = await CourseModel.query().findById(ctx.params.id);

  ctx.assert(courseObj, 404, 'Course not found');

  const fileNameBase = await nanoid(11);

  const { file } = ctx.request.files;

  const fileExtension = path.extname(file.name);

  if (!['.webp', '.svg', '.png', '.jpeg', '.gif', '.avif', '.jpg'].includes(fileExtension)) {
    ctx.throw(400, { error: 'Image format not supported' });
  }

  let resizer;
  try {
    resizer = await sharp(file.path)
      .resize(328, 200)
      .jpeg({ quality: 70 });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(500, null, { errors: [e.message] });
    }
  }

  if (s3.config) {
    let buffer = await resizer.toBuffer();
    const params = {
      Bucket: s3.config.bucket, // pass your bucket name
      Key: `/uploads/courses/${fileNameBase}.jpg`, // key for saving filename
      Body: buffer, //image to be uploaded
      ACL: 'public-read'
    };

    try {
      //Upload image to AWS S3 bucket
      const uploaded = await s3.s3.upload(params).promise();
      log.info('Uploaded in:', uploaded.Location);

      const course = await courseObj.$query()
        .patchAndFetch({ thumbnailUrl: uploaded.Location });

      ctx.body = { course };
      ctx.status = 200;
    } catch (e) {
      log.error(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }

  } else {
    const thumbnailDirectory = '/uploads/images/courses';
    const localUploadPath = path.resolve(__dirname, '../public' + thumbnailDirectory);

    const filename = `${fileNameBase}.jpg`;
    try {
      if (!fs.existsSync(localUploadPath)) {
        fs.mkdirSync(localUploadPath, { recursive: true });
      }

      await resizer.toFile(`${localUploadPath}/${filename}`);

      const course = await courseObj.$query()
        .patchAndFetch({ thumbnailUrl: `${thumbnailDirectory}/${filename}` });

      ctx.body = { course };
      ctx.status = 200;
    } catch (e) {
      log.error(e);
    }
  }
});


/**
 * @api {delete} /api/v1/courses/:id Delete a course
 * @apiName DELETE a course by Id
 * @apiGroup Courses
 * @apiPermission authenticated user
 * @apiVersion 0.4.0
 *
 * @apiHeader {String} Authorization Bearer << JWT here>>
 *
 * @apiParam (URI Param) {String} id Id of the course to delete
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
 *     { }
 *
 *
 */
router.delete('/:id', requireAuth, async ctx => {
  const tag = await CourseModel.query()
    .findById(ctx.params.id);

  ctx.assert(tag, 404, 'No course with that Id exist');

  try {
    await tag.$query().delete();

    ctx.status = 200;
    ctx.body = {};
  } catch (e) {
    log.error(e);
  }

});

function anonymousProfile() {
  return {
    name: 'Private',
    username: 'Private',
    id: 'Private',
    profileUri: '/uploads/images/profile-placeholder.gif'
  };
}
module.exports = router.routes();
