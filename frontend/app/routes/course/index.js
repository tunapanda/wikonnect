import Route from '@ember/routing/route';

export default class CourseIndexRoute extends Route {
  // async model(params) {
  //   console.log(params);
  //   return this.store.findRecord('course', "diglit", { include: 'modules' });
  // }
  model(params) {
    console.log(params);
    return this.store.findBySlug('course', params.course_slug);
  }
}
