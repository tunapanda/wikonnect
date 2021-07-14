import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileEditRoute extends Route {
  @service me;

  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      // eslint-disable-next-line ember/no-controller-access-in-routes
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('login');
    }
    return super.beforeModel(transition);
  }
}
