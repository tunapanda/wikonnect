const Router = require('koa-router');
const path = require('path');
const unzipper = require('unzipper');
const busboy = require('async-busboy');

const shortid = require('shortid');
const sharp = require('sharp');
const s3 = require('../utils/s3Util');


const Chapter = require('../models/chapter');
const Achievement = require('../models/achievement');
const permController = require('../middleware/permController');
const validateChapter = require('../middleware/validation/validateChapter');


const router = new Router({
  prefix: '/chapters'
});

async function returnChapterStatus(chapter, achievement) {
  if (chapter.length == undefined) {
    achievement.forEach(ach => {
      if (chapter.id == ach.target) {
        return chapter.targetStatus = ach.targetStatus;
      }
    });
  } else {
    chapter.forEach(chap => {
      achievement.forEach(ach => {
        if (chap.id == ach.target) {
          return chap.targetStatus = ach.targetStatus;
        }
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
 *           "contentUri": "/uploads/h5p/chapter1",
 *           "imageUrl": "/uploads/images/content/chapters/chapter1.jpeg"
 *         }]
 *      }
 * @apiError {String} errors Bad Request.
 */

router.get('/', permController.requireAuth, async ctx => {
  try {
    const chapter = await Chapter.query().where(ctx.query);
    const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);

    returnChapterStatus(chapter, achievement);

    ctx.status = 200;
    ctx.body = { chapter };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { message: 'The query key does not exist' };
  }
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
 *        "imageUrl": null
 *      }
 *
* @apiError {String} errors Bad Request.
 */
router.get('/:id', permController.requireAuth, async ctx => {
  const chapter = await Chapter.query().findById(ctx.params.id);
  ctx.assert(chapter, 404, 'no lesson by that ID');

  const achievement = await Achievement.query().where('user_id', ctx.state.user.data.id);
  returnChapterStatus(chapter, achievement);

  ctx.status = 200;
  ctx.body = { chapter };
});

router.post('/', permController.requireAuth, permController.grantAccess('createAny', 'path'), validateChapter, async ctx => {
  let newChapter = ctx.request.body.chapter;

  newChapter.slug = newChapter.name.replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-*|-*$/g, '')
    .toLowerCase();

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
    ctx.assert(module, 401, 'Something went wrong');
  }
  ctx.status = 201;
  ctx.body = { chapter };

});
router.put('/:id', permController.requireAuth, permController.grantAccess('updateOwn', 'path'), async ctx => {
  const chapter_record = await Chapter.query().findById(ctx.params.id);

  if (!chapter_record) {
    ctx.throw(400, 'No chapter with that ID');
  }
  let chapter;
  try {
    chapter = await Chapter.query().patchAndFetchById(ctx.params.id, ctx.request.body.chapter);
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else { ctx.throw(400, null, { errors: ['Bad Request'] }); }
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

  const { files } = await busboy(ctx.req);
  const fileNameBase = shortid.generate();
  const uploadPath = 'uploads/images/content/chapters';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  // const sizes = [
  //   70,
  //   320,
  //   640
  // ];

  ctx.assert(files.length, 400, 'No files sent.');
  ctx.assert(files.length === 1, 400, 'Too many files sent.');

  // const resizedFiles = Promise.all(sizes.map((size) => {
  //   const resize = sharp()
  //     .resize(size, size)
  //     .jpeg({ quality: 70 })
  //     .toFile(`public/uploads/images/profile/${fileNameBase}_${size}.jpg`);
  //   files[0].pipe(resize);
  //   return resize;
  // }));

  const resizer = sharp()
    .resize(500, 500)
    .jpeg({ quality: 70 });

  files[0].pipe(resizer);


  if (s3.config) {


    let buffer = await resizer.toBuffer();

    const params = {
      Bucket: s3.config.bucket, // pass your bucket name
      Key: `uploads/profiles/${fileNameBase}.jpg`, // key for saving filename
      Body: buffer, //image to be uploaded
    };


    try {
      //Upload image to AWS S3 bucket
      const uploaded = await s3.s3.upload(params).promise();

      console.log('Uploaded in:', uploaded.Location);
      ctx.body = {
        host: `${params.Bucket}.s3.amazonaws.com/uploads/chapters`,
        path: `${fileNameBase}.jpg`
      };
    }

    catch (e) {
      console.log(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }

  } else {

    await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);

    ctx.body = {
      host: ctx.host,
      path: `${uploadPath}/${fileNameBase}.jpg`
    };
  }
});

router.post('/:id/upload', async ctx => {
  const dirName = ctx.params.id;
  const uploadPath = `uploads/h5p/${dirName}`;
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

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
