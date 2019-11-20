import Route from '@ember/routing/route';

export default class CourseIndexRoute extends Route {
  async model() {

    return this.store.findRecord('course', "diglit", { include: 'modules' });
  }
}
