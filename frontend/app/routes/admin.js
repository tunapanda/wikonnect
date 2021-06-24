import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AdminRoute extends Route {
  @service me;

  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      // eslint-disable-next-line ember/no-controller-access-in-routes
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    } else {
      if (!this.me.isAdmin && !this.me.isModerator) {
        this.transitionTo('access-denied');
      }
    }

    return super.beforeModel(transition);
  }
}
