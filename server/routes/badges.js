const Router = require('koa-router');
const Badge = require('../models/badges');
const path = require('path');
const sharp = require('sharp');
const koaBody = require('koa-body')({ multipart: true, multiples: false, keepExtensions: true });
const { nanoid } = require('nanoid/async');

const { requireAuth, grantAccess } = require('../middleware/permController');

const s3 = require('../utils/s3Util');
const log = require('../utils/logger');
const slugGen = require('../utils/slugGen');

const router = new Router({
  prefix: '/badges'
});

router.get('/:id', requireAuth, grantAccess('readAny', 'private'), async ctx => {
  const badge = await Badge.query().findById(ctx.params.id).where({ isDeleted: false });

  // ctx.assert(badge, 404, 'Not found', { errors: ['Bad Request'] } );
  ctx.assert(badge, 404, null, { errors: ['Bad Request'] });

  ctx.status = 200;
  ctx.body = { badge };
});

router.get('/', requireAuth, async ctx => {
  const badge = await Badge.query().where(ctx.query);
  ctx.assert(badge, 404);
  ctx.status = 200;
  ctx.body = { badge };
});


router.post('/', requireAuth, async ctx => {
  let newBadge = ctx.request.body.badge;
  newBadge.slug = await slugGen(newBadge.name);

  const badge = await Badge.query().insertAndFetch(newBadge);
  ctx.assert(badge, 401, 'Something went wrong');

  ctx.status = 201;

  ctx.body = { badge };

});
router.put('/:id', requireAuth, async ctx => {

  const badgeChecker = await Badge.query().findById(ctx.params.id);
  ctx.assert(badgeChecker, 400, null, { errors: ['Bad Request'] });

  const badge = await badgeChecker.$query().patchAndFetchById(ctx.params.id, ctx.request.body.badge);
  ctx.status = 201;
  ctx.body = { badge };
});

router.delete('/:id', async ctx => {
  const badge = await Badge.query()
    .where({ isDeleted: false })
    .findById(ctx.params.id);
  ctx.assert(badge, 400, 'Not found');

  await badge.$query()
    // .patch({ isDeleted: true });
    .delete();

  ctx.status = 200;
  ctx.body = { badge };
});


/**
 * @api {post} /users/:id/profile-image POST users profile picture.
 * @apiName PostAUser
 * @apiGroup Authentication
 *
 * @apiVersion 0.4.0
 * @apiDescription upload user profile pic
 * @apiPermission [basic, admin, superadmin]
 * @apiHeader (Header) {String} authorization Bearer <<YOUR_API_KEY_HERE>>
 *
 *
 * @apiError {String} errors Bad Request.
 */


router.post('/:id/badge-image', requireAuth, koaBody, requireAuth, async (ctx) => {

  ctx.assert(ctx.request.files.file, 400, 'No file image uploaded');

  const fileNameBase = await nanoid(11);
  const uploadPath = 'uploads/images/badges';
  const uploadDir = path.resolve(__dirname, '../public/' + uploadPath);

  const { file } = ctx.request.files;

  const fileExtension = path.extname(file.name);

  if (!['.webp', '.svg', '.png', '.jpeg', '.gif', '.avif', '.jpg'].includes(fileExtension)) {
    ctx.throw(400, { error: 'Image format not supported' });
  }

  let resizer;
  try {
    resizer = sharp(file.path)
      .resize(500, 500)
      .jpeg({ quality: 70 });
  } catch (e) {
    if (e.statusCode) {
      ctx.throw(e.statusCode, null, { errors: [e.message] });
    } else {
      ctx.throw(500, null, { errors: [e.message] });
    }
  }

  // This will execute the update hooks because here we have a model
  // instance `badge`.


  if (s3.config) {
    let buffer = await resizer.toBuffer();
    const params = {
      Bucket: s3.config.bucket, // pass your bucket name
      Key: `uploads/badges/${fileNameBase}.jpg`, // key for saving filename
      Body: buffer, //image to be uploaded
    };

    try {
      //Upload image to AWS S3 bucket
      const uploaded = await s3.s3.upload(params).promise();
      log.info('Uploaded in:', uploaded.Location);
      await Badge.query().patchAndFetchById(ctx.params.id, { profileUri: fileNameBase });

      ctx.body = {
        host: `${params.Bucket}.s3.amazonaws.com/uploads/badges`,
        path: `${fileNameBase}.jpg`
      };
    } catch (e) {
      log.error(e);
      ctx.throw(e.statusCode, null, { message: e.message });
    }
  } else {
    try {
      await resizer.toFile(`${uploadDir}/${fileNameBase}.jpg`);
      await Badge.query()
        .patchAndFetchById(ctx.params.id, { profileUri: `/${uploadPath}/${fileNameBase}.jpg` });

      ctx.status = 200;
      ctx.body = {
        host: ctx.host,
        path: `/${uploadPath}/${fileNameBase}.jpg`,
      };
    } catch (e) {
      if (e.statusCode) {
        ctx.throw(e.statusCode, null, { errors: [e.message] });
      } else {
        ctx.throw(400, null, { errors: [e.message] });
      }
    }
  }
});

module.exports = router.routes();
