const Router = require('koa-router');
const path = require('path');
const unzipper = require('unzipper');
const busboy = require('async-busboy');
const { ref } = require('objection');

const shortid = require('shortid');
const sharp = require('sharp');
const s3 = require('../utils/s3Util');
const log = require('../utils/logger');
const slugGen = require('../utils/slugGen');

const Chapter = require('../models/chapter');
const Rating = require('../models/rating');
const Counter = require('../models/counter');
const permController = require('../middleware/permController');
const validateGetChapter = require('../middleware/validateRequests/chapterGetValidation');
const Reaction = require('../models/reaction');

const router = new Router({
  prefix: '/chapters'
});

/**
 * @api {get} /api/v1/chapters/ GET all chapters.
 * @apiName GetChapters
 * @apiGroup Chapters
 * @apiPermission none
 * @apiDescription Get all chapter and filter using multiple query params
 *
 * @apiParam {String} [id]  Optional id
 * @apiParam {String} [name]  Optional name
 * @apiParam {String} [status] Optional chapter status - published | draft
 * @apiParam {String} [creatorId] Optional author of a chapter
 * @apiParam {Boolean} [approved] Optional boolean with default being false
 *
 * @apiParam (Authentication) {String[]} [tags] Optional tags list
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "meta": {
 *            "total_pages": 20.2
 *        },
 *        "chapter": [{
 *            "id": "chapter1",
 *            "lessonId": "lesson1",
 *            "name": "A Chapter",
 *            "slug": "a-chapter",
 *            "description": "An H5P Chapter.",
 *            "status": "published",
 *            "creatorId": "user1",
 *            "metadata": null,
 *            "createdAt": "2017-12-20T16:17:10.000Z",
 *            "updatedAt": "2017-12-20T16:17:10.000Z",
 *            "contentType": "h5p",
 *            "contentUri": "/uploads/h5p/chapter1",
 *            "imageUrl": null,
 *            "tags": [ "highschool", "university" ],
 *            "contentId": null,
 *            "approved": true,
 *            "verified": true,
 *            "topics": null,
 *            "views": "3",
 *            "ratings": "3.6666666666666667",
 *            "authenticatedUser": null,
 *            "authenticatedUserReactionId": null,
 *            "reaction": [{
 *                "totalLikes": "4",
 *                "likes": "3",
 *                "dislikes": "1"
 *               }],
 *            "flag": [],
 *            "author": {
 *                "username": "user1",
 *                "profileUri": null,
 *                "lastSeen": "2021-02-25T09:19:08.239Z"
 *            }
 *        }]
 *    }
 *
 * @apiSampleRequest /api/v1/chapters/
 *
 */

router.get('/', permController.requireAuth, validateGetChapter, async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let { page, per_page } = ctx.query;
  delete ctx.query.page;
  delete ctx.query.per_page;
  let chapter;
  try {
    // View counter for each chapter
    chapter = await Chapter.query()
      .select([
        'chapters.*',
        Counter.query()
          .where({ 'chapterId': ref('chapters.id'), 'trigger': 'timerDelay' })
          .count()
          .as('views'),
        Rating.query()
          .where('chapterId', ref('chapters.id'))
          .avg('ratings.rating')
          .as('ratings'),
        Reaction.query()
          .select('reaction')
          .where('userId', stateUserId)
          .andWhere('chapterId', ref('chapters.id'))
          .as('authenticated_user'),
        Reaction.query()
          .select('id')
          .where('userId', stateUserId)
          .andWhere('chapterId', ref('chapters.id'))
          .as('authenticated_user_reaction_id')
      ])
      .where(ctx.query)
      .page(page, per_page)
      .withGraphFetched(
        '[reaction(reactionAggregate), flag(selectFlag),author(selectNameAndProfile)]'
      )
      .orderBy('id');
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }

  chapter = {
    meta: {
      total_pages: chapter.total / per_page
    },
    chapter: chapter.results,
  };

  ctx.assert(chapter, 404, 'No chapter by that ID');
  ctx.status = 200;
  ctx.body = chapter;

});

/**
 * @api {get} /api/v1/chapters/:id GET single chapter.
 * @apiName GetAChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 *
 * @apiParam {String} id Chapter unique ID
 *
 * @apiSuccess {Object[]} chapter list
 * @apiSuccess {String} chapter.id Chapter id
 * @apiSuccess {Object[]} Chapter[object] Object data
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "chapter": {
 *            "id": "chapter1",
 *            "lessonId": "lesson1",
 *            "name": "A Chapter",
 *            "slug": "a-chapter",
 *            "description": "An H5P Chapter.",
 *            "status": "published",
 *            "creatorId": "user1",
 *            "createdAt": "2017-12-20T16:17:10.000Z",
 *            "updatedAt": "2017-12-20T16:17:10.000Z",
 *            "contentType": "h5p",
 *            "contentUri": "/uploads/h5p/chapter1",
 *            "imageUrl": "/uploads/images/content/chapters/chapter1.jpeg",
 *            "contentId": null,
 *            "tags": [],
 *            "likes": "0",
 *            "dislikes": "0",
 *            "rating": null,
 *            "verified": true,
 *            "comment": [{
*               "id": "IwAfzOqAAI4",
*               "chapterId": "chapter1",
*               "creatorId": "user2",
*               "comment": "Dolores aut ut.",
*               "metadata": null,
*               "createdAt": "2020-07-08T13:25:44.710Z",
*               "updatedAt": "2021-03-03T19:58:48.806Z",
*               "replies": [{
*                   "id": "IwAfzOuAAME",
*                   "chapterId": "chapter4",
*                   "creatorId": "user1",
*                   "comment": "Architecto voluptatem quaerat et dolores aut consequatur et.",
*                   "metadata": null,
*                   "createdAt": "2020-10-08T06:19:39.434Z",
*                   "updatedAt": "2021-03-04T03:43:11.647Z",
*                   "type": "comment"
*                  },
*                  {
*                   "id": "IwAfzOuAALc",
*                   "chapterId": "chapter4",
*                   "creatorId": "user2",
*                   "comment": "Omnis sequi architecto quod voluptas aut.",
*                   "metadata": null,
*                   "createdAt": "2020-04-17T08:55:33.210Z",
*                   "updatedAt": "2021-03-04T14:36:27.525Z",
*                   "type": "comment"
*                 }],
*                 "type": "comment"
*               }],
 *            "author": {
 *              "username": "user1",
 *              "profileUri": null,
 *              "lastSeen": "2021-02-22T11:57:10.468Z"
 *            },
 *            "reaction": [{
 *              "likes": 3,
 *              "authenticated_user": "like",
 *              "reaction.id": "",
 *              "dislikes": 1
 *            }]
 *         }
 *      }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:id', permController.requireAuth, async ctx => {

  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  let chapter;
  try {
    chapter = await Chapter.query()
      .select([
        'chapters.*',
        Counter.query()
          .where({ 'chapterId': ref('chapters.id'), 'trigger': 'timerDelay' })
          .count()
          .as('views'),
        Rating.query()
          .where('chapterId', ref('chapters.id'))
          .avg('ratings.rating')
          .as('ratings'),
        Reaction.query()
          .select('reaction')
          .where('userId', stateUserId)
          .andWhere('chapterId', ref('chapters.id'))
          .as('authenticated_user')

      ])
      .where({ 'chapters.id': ctx.params.id })
      .withGraphFetched(
        '[comment.[replies], reaction(reactionAggregate), flag(selectFlag),author(selectNameAndProfile)]'
      );

  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }

  ctx.assert(chapter, 404, 'No chapter by that ID');


  ctx.status = 200;
  ctx.body = { chapter };
});


/**
 * @api {post} /api/v1/chapters POST single chapter.
 * @apiName PostAChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiParam {String} chapter[name] Name - Unique.
 * @apiParam {String} chapter[description] Description.
 * @apiParam {String} chapter[status] modules status - options[published | draft]
 * @apiParam {Boolean} chapter[approved] defaults is false
 * @apiParam {Object[]} chapter[tags] Tags list.
 *
 *
 * @apiSampleRequest off
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "chapter": {
 *        "id": "chapter4",
 *        "lessonId": "lesson2",
 *        "name": "A Chapter4",
 *        "slug": "a-chapter4",
 *        "description": "An H5P Chapter.",
 *        "status": "published",
 *        "creatorId": "user1",
 *        "createdAt": "2017-12-20T16:17:10.000Z",
 *        "updatedAt": "2017-12-20T16:17:10.000Z",
 *        "contentType": "h5p",
 *        "contentUri": "/uploads/h5p/chapter4",
 *        "imageUrl": null,
 *        "contentId": null,
 *        "tags": [],
 *        "approved": false
 *      }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/', permController.requireAuth, async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  let newChapter = ctx.request.body.chapter;

  // Server side slug generator
  newChapter.slug = await slugGen(newChapter.name);
  newChapter.creatorId = stateUserId;

  let chapter;
  try {
    chapter = await Chapter.query().insertAndFetch(newChapter);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
    throw e;
  }
  ctx.assert(chapter, 401, 'Something went wrong');

  ctx.status = 201;
  ctx.body = { chapter };

});


/**
 * @api {put} /api/v1/chapters/:id PUT single chapter.
 * @apiName PutAChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiParam {String} id Id - Unique.
 * @apiParam {String} chapter[name] Name - Unique.
 * @apiParam {String} chapter[description] Description.
 * @apiParam {String} chapter[status] modules status - published | draft
 * @apiParam {Boolean="false"} chapter[approved] defaults is false
 * @apiParam {Object[]} chapter[tags] Tags list.
 *
 * @apiSampleRequest /api/v1/chapters/:id
 *
 * @apiSuccess {Object[]} chapter[object] Object data
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', permController.requireAuth, async ctx => {
  let chapterData = ctx.request.body.chapter;
  if (chapterData.id) delete chapterData.id;

  const stateUserRole = ctx.state.user.role == undefined
    ? ctx.state.user.data.role
    : ctx.state.user.role;
  const roles = ['admin', 'superadmin'];
  if (!roles.includes(stateUserRole)) {
    ctx.throw(400, null, { errors: ['Not enough permissions'] });
    chapterData.verified = 'false';
  }

  const chapterCheck = await Chapter.query().findById(ctx.params.id);
  ctx.assert(chapterCheck, 400, 'Invalid data provided');

  try {
    const chapter = await chapterCheck.$query().patchAndFetchById(ctx.params.id, chapterData);
    ctx.status = 201;
    ctx.body = { chapter };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});



router.delete('/:id', permController.requireAuth, async ctx => {
  const chapter = await Chapter.query().findById(ctx.params.id);
  ctx.assert(chapter, 401, 'No ID was found');
  await Chapter.query().delete().where({ id: ctx.params.id });

  ctx.status = 200;
  ctx.body = { chapter };
});


/**
 * @api {post} /api/v1/chapters/:id/chapter-image POST chapter banner image.
 * @apiName PostBannerImage
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "host": hostname of where the image has been uploaded
 *      "path": image path
 *    }
 *
 * @apiSuccess {Object[]} chapter[object] Object data
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/:id/chapter-image', async (ctx, next) => {
  if ('POST' != ctx.method) return await next();
  const chapter_id = ctx.params.id;

  const { files } = await busboy(ctx.req);
  const fileNameBase = shortid.generate();
  const uploadPath = 'uploads/chapters';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  ctx.assert(files.length, 400, 'No files sent.');
  ctx.assert(files.length === 1, 400, 'Too many files sent.');

  const resizer = sharp().resize(328, 200).jpeg({ quality: 70 });

  files[0].pipe(resizer);

  if (s3.config) {
    let buffer = await resizer.toBuffer();
    const params = {
      Bucket: s3.config.bucket, // pass your bucket name
      Key: `/uploads/chapters/${fileNameBase}.jpg`, // key for saving filename
      Body: buffer, //image to be uploaded
      ACL: 'public-read'
    };

    try {
      //Upload image to AWS S3 bucket
      const uploaded = await s3.s3.upload(params).promise();
      log.info('Uploaded in:', uploaded.Location);
      await Chapter.query().patchAndFetchById(chapter_id, { imageUrl: uploaded.Location });

      ctx.body = {
        host: `${params.Bucket}.s3.amazonaws.com/uploads/chapters`,
        path: `${fileNameBase}.jpg`
      };
    } catch (e) {
      log.error(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }

  } else {

    await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);


    await Chapter.query()
      .findById(chapter_id)
      .patch({
        imageUrl: `${uploadPath}/${fileNameBase}.jpg`
      });

    ctx.body = {
      host: ctx.host,
      path: `${uploadPath}/${fileNameBase}.jpg`
    };
  }
});



/**
 * @api {post} /api/v1/chapters/:id/upload upload H5P chapter
 * @apiName PostAH5PChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        host: ctx.host,
 *        path: uploadPath
 *      }
 * @apiSuccess {Object[]} chapter[object] Object data
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.post('/:id/upload', async ctx => {
  const dirName = ctx.params.id;
  const uploadPath = `/uploads/h5p/${dirName}`;
  const uploadDir = path.resolve(__dirname, '../public' + uploadPath);

  await Chapter.query()
    .findById(dirName)
    .patch({
      content_uri: uploadPath
    });


  await busboy(ctx.req, {
    onFile: function (fieldname, file) {
      file.pipe(unzipper.Extract({ path: uploadDir }));
    }
  });
  // ctx.assert(files.length, 400, 'No files sent.');
  // ctx.assert(files.length === 1, 400, 'Too many files sent.');

  ctx.body = {
    host: ctx.host,
    path: uploadPath
  };
});

module.exports = router.routes();
