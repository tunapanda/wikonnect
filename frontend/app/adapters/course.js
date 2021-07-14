import ApplicationAdapter from './application';

export default class CourseAdapter extends ApplicationAdapter {
  urlForQuery(query, modelName) {
    if (query && query.type && query.type.toLowerCase() === 'popular') {
      return super.buildURL(modelName) + '/popular';
    }
    return super.urlForQuery(...arguments);
  }
}
