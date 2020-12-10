const _ = require('lodash');
const Router = require('koa-router');
const log = require('../utils/logger');
const search = require('../utils/search');

const models = {
  chapter: require('../models/chapter'),
  user: require('../models/user')
};

const router = new Router({
  prefix: '/search'
});


/**
 * @api {get} /search/chapter?
 * @apiDescription GET result search query using chapter name, description or tags
 * /search?q={query-string-goes-here} Using QUERY string.
 * /search?tags=highschool  Using TAGS.
 * @apiName GetSearch
 * @apiGroup Search
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest on
 *
 * @apiSuccessExample {json} Error-Response:
 *     HTTP/1.1 200
 *     {
 *        "search": [{}]
 *     }
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     [{
 *        "error": "Search Unavailable"
 *     }]
 *
 *
 */
router.get('/chapter', async ctx => {

  let chapter = models.chapter.query();
  if (ctx.query.q) {
    chapter = await chapter
      .where({ approved: 'true' })
      .where('name', 'ILIKE', `%${ctx.query.q}%`)
      .orWhere('description', 'ILIKE', `%${ctx.query.q}%`);
  } else if (ctx.query.tags) {
    chapter = await chapter
      .where({ approved: 'true' })
      .whereRaw('? = ANY(tags)', `${ctx.query.tags}`);
  }
  ctx.status = 200;
  ctx.body = { 'search': chapter };
});

router.get('/elastic', async ctx => {
  const queryText = ctx.query.q;
  try {
    const elasticResponse = await search.search({
      index: search.indexName,
      body: {
        query: {
          query_string: {
            fields: ['name^2', 'description', 'tags'],
            query: queryText
          }
        },
        highlight: {
          pre_tags: ['<strong>'],
          post_tags: ['</strong>'],
          fields: {
            '*': {}
          }
        }
      }
    });

    const grouped = _.groupBy(elasticResponse.body.hits.hits, hit => hit._source.model);

    if (grouped.length == undefined) {
      log.info(ctx.query.q);
    }
    // const results = Object.keys(grouped).map(async modelName => ({ [modelName]: await models[modelName].query().hydrateSearch(grouped[modelName]) }));

    ctx.body = grouped;
  } catch (e) {
    if (e.name === 'ConnectionError') {
      ctx.status = 502;
      ctx.body = {
        error: 'Search Unavailable'
      };
    }
  }
});

module.exports = router.routes();