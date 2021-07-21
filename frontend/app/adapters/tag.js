import ApplicationAdapter from './application';

export default class TagAdapter extends ApplicationAdapter {
  urlForQuery(query, modelName) {
    if (query && query.type && query.type.toLowerCase() === 'popular') {
      return super.buildURL(modelName) + '/popular';
    }
    return super.urlForQuery(...arguments);
  }
}
