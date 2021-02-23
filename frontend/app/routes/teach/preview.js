import Route from '@ember/routing/route';
import { inject } from '@ember/service';
// import { tracked } from '@glimmer/tracking';

export default class TeachPreviewRoute extends Route {
  @inject
  me;

  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
  }

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }
}
