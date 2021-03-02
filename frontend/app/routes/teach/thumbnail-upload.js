import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachThumbnailUploadRoute extends Route {
  @service me;

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
