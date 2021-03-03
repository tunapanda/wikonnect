import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachPreviewRoute extends Route {
  @service me;

  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      if (!this.me.isAuthenticated) {
        // eslint-disable-next-line ember/no-controller-access-in-routes
        let loginController = this.controllerFor('login');
        loginController.set('previousTransition', transition);
      }
      this.transitionTo('login');
    }
  }

  model(params) {
    return this.store.findRecord('chapter', params.id);
  }
}
