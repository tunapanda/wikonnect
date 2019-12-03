import Route from '@ember/routing/route';

export default class CourseCreateRoute extends Route {
  model() {
    return this.store.findAll('module')
  }
}
