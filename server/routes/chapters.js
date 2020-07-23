const Router = require('koa-router');
const path = require('path');
const unzipper = require('unzipper');
const busboy = require('async-busboy');

const shortid = require('shortid');
const sharp = require('sharp');
const s3 = require('../utils/s3Util');
const log = require('../utils/logger');



const Chapter = require('../models/chapter');
const permController = require('../middleware/permController');
const validateChapter = require('../middleware/validation/validateChapter');

const slugGen = require('../utils/slugGen');
const Rating = require('../models/rating');

const environment = process.env.NODE_ENV;
const config = require('../knexfile.js')[environment];
const knex = require('knex')(config);

const router = new Router({
  prefix: '/chapters'
});

async function ratingVal(parent, avg) {
  if (parent.length == undefined) {
    return parent.rating = avg;
  } else {
    parent.forEach(mod => {
      return mod.rating = avg;
    });
  }
}
// async function returnChapterStatus(chapter, achievement) {
//   if (chapter.length === undefined) {
//     achievement.forEach(ach => {
//       if (chapter.id === ach.target) {
//         // console.log(ach.target_status);
//         return chapter.targetStatus = ach.target_status;
//       }
//     });
//   } else {
//     chapter.forEach(chap => {

//       achievement.forEach(ach => {
//         console.log(chap.id, ach.id);
//         if (chap.id === ach.target) {
//           console.log(ach.target_status);

//           return chap.targetStatus = ach.target_status;
//         }
//       });
//     });
//   }
// }


async function returnType(parent) {
  if (parent.length == undefined) {
    parent.comment.forEach(comment => {
      return comment.type = 'comment';
    });
  } else {
    parent.forEach(mod => {
      mod.comment.forEach(comment => {
        return comment.type = 'comment';
      });
    });
  }
}

async function achievementType(parent) {
  if (parent.length == undefined) {
    parent.achievement.forEach(data => {
      return data.type = 'achievement';
    });
  } else {
    parent.forEach(mod => {
      mod.achievement.forEach(data => {
        return data.type = 'achievement';
      });
    });
  }
}


/**
 * @api {get} /chapters/ GET all chapters.
 * @apiName GetChapters
 * @apiGroup Chapters
 * @apiPermission none
 *
 * @apiSampleRequest off
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *         "chapter": [{
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
 *            "comment": [{
 *            }]
 *         }]
 *      }
 * @apiError {String} errors Bad Request.
 */

router.get('/', permController.requireAuth, async ctx => {

  let stateUserRole = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;
  let roleNameList = ['basic', 'superadmin', 'tunapanda'];

  let chapter;
  if (roleNameList.includes(stateUserRole)) {
    if (ctx.query.q) {
      chapter = await Chapter.query()
        .where('name', 'ILIKE', `%${ctx.query.q}%`)
        .orWhere('description', 'ILIKE', `%${ctx.query.q}%`)
        .where({ status: 'published' })
        .eager('comment(selectComment)');
    } else {
      chapter = await Chapter.query().where(ctx.query).where({ status: 'published' }).eager('[comment(selectComment), achievement(selectAchievement),rating(selectRating), flag(selectFlag)]');
    }
    await returnType(chapter);
    await achievementType(chapter);
  } else {
    chapter = await Chapter.query().where(ctx.query).eager('[comment(selectComment), flag(selectFlag), rating(selectRating)]');
    // chapter = await Chapter.query()
    //   .select('chapters.*', 'rate.rating')
    //   .from('chapters')
    //   .avg('rate.rating as rating')
    //   .where({ status: 'published' })
    //   .innerJoin('ratings as rate', 'chapters.id', 'rate.chapter_id')
    //   .groupBy('chapters.id', 'rate.rating');
  }

  ctx.status = 200;
  ctx.body = { 'chapter': chapter };
});

router.get('/teach', permController.requireAuth, async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let chapter = await Chapter.query().where({ 'creator_id': stateUserId });

  ctx.status = 200;
  ctx.body = { 'chapter': chapter };
});

router.get('/teach/:id', permController.requireAuth, async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let chapter = await Chapter.query().where(ctx.query).where({ id: ctx.params.id, creatorId: stateUserId });

  ctx.status = 200;
  ctx.body = { 'chapter': chapter };
});


/**
 * @api {get} /chapters/:id GET single chapter.
 * @apiName GetAChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
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
 *        "tags": []
 *      }
 *
* @apiError {String} errors Bad Request.
 */
router.get('/:id', permController.requireAuth, async ctx => {
  let stateUserRole = ctx.state.user.role == undefined ? ctx.state.user.data.role : ctx.state.user.role;
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let roleNameList = ['basic', 'superadmin', 'tunapanda'];
  let anonymous = 'anonymous';

  let chapter;

  if (roleNameList.includes(stateUserRole)) {
    chapter = await Chapter.query().where({ id: ctx.params.id, status: 'published' }).eager('[comment(selectComment), flag(selectFlag), achievement(selectAchievement)]');
  } else if (stateUserRole == anonymous) {
    chapter = await Chapter.query().where({ id: ctx.params.id, status: 'published' }).eager('comment(selectComment)');
  } else {
    chapter = await Chapter.query().where({ id: ctx.params.id, creatorId: stateUserId });
  }

  const rating = await knex('ratings').where({ 'chapter_id': ctx.params.id }).avg('rating');

  ctx.assert(chapter, 404, 'no lesson by that ID');

  await ratingVal(chapter, rating[0].avg);
  await returnType(chapter);
  await achievementType(chapter);


  ctx.status = 200;
  ctx.body = { chapter };
});


/**
 * @api {post} /chapters POST single chapter.
 * @apiName PostAChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiParam {String} chapter[name] Name - Unique.
 * @apiParam {String} chapter[description] Description.
 * @apiParam {String} chapter[status] modules status - published | draft .
 * @apiParam {String} chapter[tags:[ Array ]] Array of tags.
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
 * @apiError {String} errors Bad Request.
 */
router.post('/', permController.requireAuth, validateChapter, async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;
  let newChapter = ctx.request.body.chapter;

  // slug generation automated
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


router.put('/:id', permController.requireAuth, async ctx => {
  //router.put('/:id', async ctx => {
  const chapter_record = await Chapter.query().findById(ctx.params.id);
  let chapterData = ctx.request.body.chapter;

  if (!chapter_record) {
    ctx.throw(400, 'No chapter with that ID');
  }

  // if (chapter_record.imageUrl === null || chapter_record.contentUri === null) {
  //   chapterData.status = 'draft';
  //   log.info(chapterData.status);
  // }

  let chapter;
  try {
    chapter = await Chapter.query().patchAndFetchById(ctx.params.id, chapterData);
  } catch (e) {
    log.error('cant save');
    log.error(e);
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: [e.message] }); }
    throw e;
  }
  ctx.status = 201;
  ctx.body = { chapter };
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
 * @api {post} /chapters/:id/chapter-image POST chapter banner image.
 * @apiName PostBannerImage
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "host": hostname of where the image has been uploaded
 *      "path": image path
 *    }
 *
 * @apiError {String} errors Bad Request.
 */
router.post('/:id/chapter-image', async (ctx, next) => {
  if ('POST' != ctx.method) return await next();
  const chapter_id = ctx.params.id;

  const { files } = await busboy(ctx.req);
  const fileNameBase = shortid.generate();
  const uploadPath = 'uploads/chapters';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);
  console.log('dsfsd');

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
    console.log('db updated');


    ctx.body = {
      host: ctx.host,
      path: `${uploadPath}/${fileNameBase}.jpg`
    };
  }
});



/**
 * @api {post} /chapters/:id/upload upload H5P chapter
 * @apiName PostAH5PChapter
 * @apiGroup Chapters
 * @apiPermission none
 * @apiVersion 0.4.0
 * @apiSampleRequest off
 * @apiSampleRequest off
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        host: ctx.host,
 *        path: uploadPath
 *      }
 * @apiError {String} errors Bad Request.
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
