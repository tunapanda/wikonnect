import Route from '@ember/routing/route';

export default class CourseEditRoute extends Route {
  model({ id }) {
    return this.store.find('course', id);
  }

  afterModel() {
    return Promise.all([
      this.store.query('chapter', { approved: true }),
      this.store.query('tag', { courseTagsOnly: true }),
    ]);
  }
}
