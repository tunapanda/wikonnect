const Router = require('koa-router');
const {requireAuth} = require('../middleware/permController');
const Chapter = require('../models/chapter');
const querystring = require('querystring');
const urlLib = require('url');

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
 * @apiParam {String} [url] absolute_url to chapter id
 * @apiParam {String} [format] Optional either xml or json (default).
 * @apiParam {Integer} [maxwidth] Optional iframe width
 * @apiParam {Integer} [minheight] Optional iframe height
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
  const {url, format, maxwidth, maxheight, callbackUrl} = ctx.query;


  ctx.assert(url, 404, {message: 'Resource url not defined'});


  if (format && !(format.toLocaleLowerCase() == 'json' || format.toLocaleLowerCase() == 'xml')) {
    console.log('thrown');
    ctx.throw(501, {message: 'Format not implemented'});
  }

  const provider_url = process.env.APP_URL ? process.env.APP_URL : 'https://app.wikonnect.org';
  const providerName = process.env.APP_NAME ? process.env.APP_NAME : 'Wikonnect';

  const callback = callbackUrl === undefined ? '' : `callbackUrl=${querystring.parse(callbackUrl)}`;

  const width = maxwidth ? (Array.isArray(maxwidth) ? maxwidth[0] : maxwidth) : 425;
  const height = maxheight ? (Array.isArray(maxheight) ? maxheight[0] : maxheight) : 344;

  const resource = urlLib.parse(decodeURI(url));

  const n = resource.pathname.lastIndexOf('/');
  const chapterId = resource.pathname.substring(n + 1);
  const chapter = await Chapter.query().findById(chapterId);
  ctx.assert(chapter, 404, {message: 'Content not found'});

  let data;

  if (!format || format.toLocaleLowerCase() == 'json') {
    data = {
      'version': '1.0',
      'type': 'rich',
      'provider_name': providerName,
      'provider_url': provider_url,
      'width': width,
      'height': height,
      'content_id': chapter.id,
      'title': `${chapter.name}`,
      'html': `<iframe width='${width}' height='${height}' src='${provider_url}/embed/${chapter.id}?${callback}'></iframe>`
    };

    ctx.type = 'application/json';
  } else {
    data =
        `<oembed>
            <version>1.0</version>
            <type>rich</type>
            <title>${chapter.name}</title>
            <content_id>${chapter.id}</content_id>
            <height>${height}</height>
            <width>${width}</width>
            <provider_name>${providerName}</provider_name>
            <provider_url>${provider_url}/</provider_url>
            <html>
              <iframe width='${width}' height='${height}'  src='${provider_url}/embed/${chapter.id}?${callback}' >
              </iframe>
            </html>
          </oembed>`;

    ctx.type = 'text/xml';
  }
  ctx.status = 200;
  ctx.body = data;
});


module.exports = router.routes();
