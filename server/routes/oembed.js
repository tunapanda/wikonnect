const Router = require('koa-router');
const fetch = require('node-fetch');
const { requireAuth } = require('../middleware/permController');

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
 * @apiSampleRequest /api/v1/oembed/
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

router.get('/', requireAuth, async ctx =>{
  let url = ctx.query.url;
  const response = await fetch(url);
  const json = await response.json();
  const provider_url = 'http://app.wikonnect.org/';
  let data = {
    'version': '1.0',
    'type': 'h5p',
    'provider_name': 'Wikonnect',
    'provider_url': `${provider_url}`,
    'width': 425,
    'height': 344,
    'title': `${json.chapter[0].name}`,

    'html':
      `<iframe width="560" height="315" src="${provider_url}/embed/${json.chapter[0].id}" ></iframe>`,
  };
  ctx.status = 200;
  ctx.body = { data };
});


module.exports = router.routes();
