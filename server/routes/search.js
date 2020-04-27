const Router = require('koa-router');
const search = require('../utils/search');
const _ = require('lodash');

// const models = {
//   learning_path: require('../models/learning_path'),
//   course: require('../models/course'),
//   module: require('../models/module'),
//   lesson: require('../models/lesson')
// };

const router = new Router({
  prefix: '/search'
});


/**
 * @api {get} /search?q={query string goes here} GET result search query.
 * @apiName GetSearch
 * @apiGroup Search
 * @apiPermission none
 * @apiVersion 0.4.0
 *
 * @apiSampleRequest off
 *
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 404 Not Found
 *     [{
 *        "error": "Search Unavailable"
 *     }]
 */

router.get('/', async ctx => {
  const queryText = ctx.query.q;
  console.log(queryText);

  try {
    const elasticResponse = await search.search({
      index: search.indexName,
      body: {
        query: {
          query_string: {
            fields: ['name^2', 'description'],
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