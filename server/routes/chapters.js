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

const router = new Router({
  prefix: '/chapters'
});

async function returnType(parent) {
  if (parent.length == undefined) {
    parent.comment.forEach(comment => {
      return comment.type = 'comments';
    });
  } else {
    parent.forEach(mod => {
      mod.comment.forEach(comment => {
        return comment.type = 'comments';
      });
    });
  }
}


function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64;
}

async function getChapterImage(id) {

  try {
    if (s3.config) {
      const params = {
        Bucket: s3.config.bucket, // pass your bucket name
        Key: `uploads/chapters/${id}.jpg`, // key for saving filename
      };

      const getImage = await s3.s3.getObject(params).promise();
      let image = 'data:image/(png|jpg);base64,' + encode(getImage.Body);
      return image;
    }
  } catch (e) {
    console.log(e);
    // return 'images/profile-placeholder.gif';
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
      chapter = await Chapter.query().where(ctx.query).where({ status: 'published' }).eager('comment(selectComment)');
    }
    await returnType(chapter);
  } else {
    chapter = await Chapter.query().where(ctx.query);
  }

  ctx.status = 200;
  ctx.body = { chapter };
});

router.get('/teach', permController.requireAuth, async ctx => {
  let stateUserId = ctx.state.user.id == undefined ? ctx.state.user.data.id : ctx.state.user.id;

  let chapter = await Chapter.query().where({ 'creator_id': stateUserId });

  // let chapter;
  // try {
  //   chapter = await Chapter.query().where({ creatorId: stateUserId });
  // } catch (e) {
  //   ctx.throw(400, null, { errors: [e.message] });
  // }

  ctx.status = 200;
  ctx.body = { chapter };
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
    chapter = await Chapter.query().where({ id: ctx.params.id, status: 'published' }).eager('comment(selectComment)');
  } else if (stateUserRole == anonymous) {
    chapter = await Chapter.query().where(ctx.query).where({ id: ctx.params.id, status: 'published' });
  } else {
    chapter = await Chapter.query().where(ctx.query).where({ id: ctx.params.id, creatorId: stateUserId });
  }

  ctx.assert(chapter, 404, 'no lesson by that ID');
  chapter.imageUrl = await getChapterImage(chapter[0].imageUrl);

  // const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);
  // returnChapterStatus(chapter, achievement);

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

  if (chapterData.imageUrl === null || chapterData.contentUri === null) {
    chapterData.status = 'draft';
    log.info(chapterData.status);
  }

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

  ctx.assert(files.length, 400, 'No files sent.');
  ctx.assert(files.length === 1, 400, 'Too many files sent.');

  const resizer = sharp().resize(500, 500).jpeg({ quality: 70 });

  files[0].pipe(resizer);

  if (s3.config) {
    let buffer = await resizer.toBuffer();
    const params = {
      Bucket: s3.config.bucket, // pass your bucket name
      Key: `uploads/chapters/${fileNameBase}.jpg`, // key for saving filename
      Body: buffer, //image to be uploaded
    };

    try {
      //Upload image to AWS S3 bucket
      const uploaded = await s3.s3.upload(params).promise();
      log.info('Uploaded in:', uploaded.Location);
      await Chapter.query().patchAndFetchById(chapter_id, { imageUrl: fileNameBase });

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
    await Chapter.query().findById(chapter_id).patchAndFetchById({ imageUrl: `${uploadPath}/${fileNameBase}.jpg` });

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


async function uploadToBucket(file, dirName) {
  const params = {
    Bucket: s3.config.bucket, // pass your bucket name
    Key: `uploads/h5p/${dirName}`, // key for saving filename
    Body: file, //image to be uploaded
    ContentType: 'h5p' // required
  };

  console.log('Bucket Upload: ' + new Date());
  console.log('--------------------------------------------------------------------------');
  //Upload image to AWS S3 bucket
  const data = await s3.s3.upload(params).promise();
  return data;
}
router.post('/:id/upload', async ctx => {

  const { files } = await busboy(ctx.req);
  const dirName = ctx.params.id;
  const uploadPath = `uploads/h5p/${dirName}`;
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  ctx.assert(files.length, 400, 'No files sent.');
  ctx.assert(files.length === 1, 400, 'Too many files sent.');

  // await busboy(ctx.req, {
  //   onFile: function (fieldname, file) {
  //     console.log('File [' + fieldname + ']' + ' file' + file);
  //     // let unzipped = file.pipe(unzipper.Extract({ path: uploadDir }));
  //     // // let unzipped = file.pipe(unzipper.Parse({ forceStream: true }));
  //     // console.log(file);
  //     // console.log('--------------------------------------------------------------------------');
  //     const data = uploadToBucket(file, dirName);
  //     console.log(data);
  //     console.log('--------------------------------------------------------------------------');
  //   }
  // });

  // }
  try {
    await busboy(ctx.req, {
      onFile: function (fieldname, file) {
        console.log('File [' + fieldname + ']' + ' file' + file);
        // file.pipe(unzipper.Extract({ path: uploadDir }));
        // let unzipped = file.pipe(unzipper.Parse({ forceStream: true }));
        //Upload image to AWS S3 bucket
        uploadToBucket(file, dirName);
      },
      onEnd: function () {
        Chapter.query().findById(dirName).patch({ content_uri: uploadPath, ContentType: 'h5p' });
      }
    });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request', e.message] }); }
    throw e;
  }



  ctx.body = {
    host: ctx.host,
    path: uploadPath
  };
});
module.exports = router.routes();
