const Router = require('koa-router');
const search = require('../utils/search');
const _ = require('lodash');

const models = {
  learning_path: require('../models/learning_path'),
  course: require('../models/course'),
  module: require('../models/module'),
  lesson: require('../models/lesson')
};

const router = new Router({
  prefix: '/search'
});

router.get('/', async ctx => {
  const queryText = ctx.query.q;

  const elasticResponse = await search.search({
    index: search.indexName,
    body: {
      query: {
        query_string: {
          fields: ['title^2', 'description'],
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

  const results = Object.keys(grouped).map(modelName => models[modelName].query().hydrateSearch(grouped[modelName]));

  ctx.body = await Promise.all(results);
});

module.exports = router.routes();