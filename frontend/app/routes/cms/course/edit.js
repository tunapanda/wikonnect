import Route from '@ember/routing/route';

export default class CmsCourseEditRoute extends Route {

  model(params) {
    return this.store.findBySlug('course', params.course_slug);
  }

}
