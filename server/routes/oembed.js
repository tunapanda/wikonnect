const Router = require('koa-router');
const { requireAuth } = require('../middleware/permController');
const Chapter = require('../models/chapter');
const querystring = require('querystring');
const url = require('url');

const router = new Router({
  prefix: '/oembed'
});

/**
 * @api {get} /api/v1/oembed/ GET an oembed structure.
 * @apiName GetOembed
 * @apiGroup Oembed
 * @apiPermission none
 * @apiDescription Get and embed format using url query params
 *
 * @apiParam {String} [absolute_url] absolute_url to chapter id
 *
 * @apiParam (Authentication) {String[]} [tags] Optional tags list
 *
 * @apiSuccess {Object[]}  List of chapters
 * @apiSuccess {String} version version string
 * @apiSuccess {String} type data type referencing the object asked for
 * @apiSuccess {String} provider_name name of organization
 * @apiSuccess {String} provider_url absolute url
 * @apiSuccess {Integer} width content width
 * @apiSuccess {Integer} height content height
 * @apiSuccess {String} title object title
 * @apiSuccess {String} html formatted iframe code in html
 *
 *
 * @apiSampleRequest /api/v1/oembed/?url=https://app.wikonnect.org/chapter/IPUkk_YAA9w?callbackUrl=https://webhook.com
 *
 *
 * http://localhost/api/v1/oembed?url=http://localhost:4200/chapters/chapter1
 * {
   "version": "1.0",
   "type": "h5p",
   "provider_name": "Wikonnect",
   "provider_url": "http://app.wikonnect.org/",
   "width": 425,
   "height": 344,
   "title": "Cyber bullying",

   "html":
      "<iframe width=\"560\" height=\"315\" src=\"http://localhost:4200/embed/chapter1\" ></iframe>",
}
 */

router.get('/', requireAuth, async ctx => {
  let rawUrl = ctx.query.url;
  let parsedUrl = url.parse(rawUrl);
  let parsedQs = querystring.parse(parsedUrl.query);

  const callbackUrl = parsedQs.callbackUrl === undefined ? '' : `callbackUrl = ${ parsedQs.callbackUrl}`;

  const n = parsedUrl.pathname.lastIndexOf('/');
  const chapterId = parsedUrl.pathname.substring(n + 1);
  const chapter = await Chapter.query().findById(chapterId);
  ctx.assert(chapter, 400, { message: ['No chapter found'] });

  const provider_url = 'https://app.wikonnect.org';
  let data = {
    'version': '1.0',
    'type': 'h5p',
    'provider_name': 'Wikonnect',
    'provider_url': `${provider_url}`,
    'width': 425,
    'height': 344,
    'title': `${chapter.name}`,
    'html': `<iframe width='425' height='344' src='${provider_url}/embed/${chapter.id}?${callbackUrl}' ></iframe>`
  };
  ctx.status = 200;
  ctx.body = { data };
});


module.exports = router.routes();
