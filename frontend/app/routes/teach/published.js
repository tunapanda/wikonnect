import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachPublishedRoute extends Route {
  @service session;
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

  async model() {
    return this.store.query('chapter', {
      creatorId: this.me.user.id,
      status: 'published',
    });
  }
}
