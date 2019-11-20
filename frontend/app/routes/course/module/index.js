import Route from '@ember/routing/route';

export default class CoursesModulesIndexRoute extends Route {

  model(params) {
    console.log(params);
    return this.store.findRecord('module', "diglit1", { include: 'lesson' });
  }
}
