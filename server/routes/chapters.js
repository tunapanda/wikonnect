const Router = require('koa-router');
const path = require('path');
const unzipper = require('unzipper');
const busboy = require('async-busboy');

const shortid = require('shortid');
const sharp = require('sharp');
const s3 = require('../utils/s3Util');
const log = require('../utils/logger');
const slugGen = require('../utils/slugGen');

const User = require('../models/user');
const Chapter = require('../models/chapter');
const permController = require('../middleware/permController');
const mojaCampaignMiddleware = require('../middleware/mojaCampaignMiddleware');
const validateGetChapter = require('../middleware/validateRequests/chapterGetValidation');

const Reaction = require('../models/reaction');
const knex = require('../utils/knexUtil');
const { raw } = require('objection');

const router = new Router({
  prefix: '/chapters'
});

const {
  returnType,
  achievementType
} = require('../utils/routesUtils/chaptersRouteUtils');

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
 * @apiSuccess {Object[]} chapter List of chapters
 * @apiSuccess {String} chapter.id Id of the chapter
 * @apiSuccess {String} chapter.name Name of the chapter
 * @apiSuccess {String} chapter.description Description of the chapter
 * @apiSuccess {String} chapter.status  Status of the chapter (published | draft)
 * @apiSuccess {Boolean} chapter.approved  boolean with default being false
 * @apiSuccess {Object} chapter.tags tags list
 * @apiSuccess {String} chapter.tags tags list
 *
 * @apiSampleRequest /api/v1/chapters/
 *
 */

router.get('/', permController.requireAuth, mojaCampaignMiddleware,  validateGetChapter, async ctx => {

  let stateUserRole = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  let user = await User.query().findById(stateUserId);

  let roleNameList = ['basic', 'superadmin', 'tunapanda', 'admin'];

  let chapter = Chapter.query()
    // eslint-disable-next-line quotes
    .select('chapters.*', raw("(SELECT COUNT(nullif(reactions.reaction, 'like')) FROM reactions WHERE reactions.chapter_id = chapters.id ) AS likes, (SELECT COUNT(nullif(reactions.reaction, '')) FROM reactions WHERE reactions.chapter_id = chapters.id) AS dislikes"))
    .avg('rate.rating as rating').avg('rate.rating as rating')
    .from('chapters');


  if (roleNameList.includes(stateUserRole)) {
    if (user.tags === null || user.tags === undefined) {
      chapter = await chapter.where(ctx.query)
        .leftJoin('ratings as rate', 'chapters.id', 'rate.chapter_id')
        .groupBy('chapters.id', 'rate.chapter_id')
        .eager('[comment(selectComment), achievement(selectAchievement), flag(selectFlag)]')
        .skipUndefined();
    } else if (user.tags != null || user.tags != undefined || user.tags === 'all') {
      chapter = await chapter.where(ctx.query).where('tags', '&&', `${user.tags}`)
        .leftJoin('ratings as rate', 'chapters.id', 'rate.chapter_id')
        .groupBy('chapters.id', 'rate.chapter_id')
        .eager('[comment(selectComment), achievement(selectAchievement), flag(selectFlag)]')
        .skipUndefined();
    }
    await achievementType(chapter);
  } else {
    chapter = await chapter
      .where(ctx.query)
      .leftJoin('ratings as rate', 'chapters.id', 'rate.chapter_id')
      .groupBy('chapters.id', 'rate.chapter_id')
      .eager('[comment(selectComment), flag(selectFlag)]');
  }
  await returnType(chapter);

  ctx.status = 200;
  ctx.body = { 'chapter': chapter };

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
 *            "comment": [{
 *            }]
 *         }
 *      }
 *
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', permController.requireAuth, async ctx => {
  let stateUserRole = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let roleNameList = ['basic', 'superadmin', 'tunapanda'];
  let anonymous = 'anonymous';
  let reaction, check_user, counter;

  let chapter = Chapter.query()
    .select('chapters.*')
    .avg('rate.rating as rating')
    .from('chapters')
    .where({ 'chapters.id': ctx.params.id })
    .leftJoin('ratings as rate', 'chapters.id', 'rate.chapter_id')
    .groupBy('chapters.id', 'rate.chapter_id');

  if (roleNameList.includes(stateUserRole)) {
    chapter = await chapter.eager('[comment(selectComment), flag(selectFlag), achievement(selectAchievement)]');
    await achievementType(chapter);
  } else if (stateUserRole == anonymous) {
    chapter = await chapter.where({ status: 'published' }).eager('comment(selectComment)');
  }

  check_user = await Reaction.query().where({ chapter_id: ctx.params.id, user_id: stateUserId });
  reaction = await knex.raw(`SELECT COUNT(*) AS total_likes, COUNT(CASE WHEN reaction = 'like' THEN 1 ELSE NULL END) AS likes, COUNT(CASE WHEN reaction = 'dislike' THEN 1 ELSE NULL END) AS dislikes FROM reactions  WHERE reactions.chapter_id = '${ctx.params.id}'`);
  counter = await knex.raw(`select count(*) from counter where trigger = 'pageLanding' and chapter_id = '${ctx.params.id}'`);

  chapter[0].total_likes = reaction.rows[0].total_likes;
  chapter[0].likes = reaction.rows[0].likes;
  chapter[0].disikes = reaction.rows[0].dislikes;
  chapter[0].authenticated_user = check_user[0] === undefined ? null : check_user[0].reaction;
  chapter[0].counter = counter.rows === undefined ? '0' : counter.rows[0].count;

  ctx.assert(chapter, 404, 'No lesson by that ID');
  await returnType(chapter);

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
  if (!chapter) {
    ctx.assert(chapter, 401, 'Something went wrong');
  }
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
  let chapterRed = await Chapter.query().findById(ctx.params.id);

  if (!chapterRed || chapterData.id) {
    ctx.throw(400, 'Body contains id, remove it');
  }

  try {
    delete chapterData.likes;
    delete chapterData.counter;
    delete chapterData.dislikes;

    const chapter = await Chapter.query().patchAndFetchById(ctx.params.id, chapterData);
    ctx.status = 201;
    ctx.body = { chapter };
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
});



router.delete('/:id', permController.requireAuth, permController.grantAccess('deleteAny', 'path'), async ctx => {
  const chapter = await Chapter.query().findById(ctx.params.id);

  if (!chapter) {
    ctx.assert(chapter, 401, 'No ID was found');
  }
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
      Key: `uploads/chapters/${fileNameBase}.jpg`, // key for saving filename
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
