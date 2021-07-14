import Route from '@ember/routing/route';

export default class CourseCreateRoute extends Route {
  model() {
    return this.store.query('tag', { courseTagsOnly: true });
  }

  afterModel() {
    return this.store.query('chapter', { approved: true });
  }
}
