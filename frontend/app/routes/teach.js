import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachRoute extends Route {
  @service me;
  @service SeoTags;

  beforeModel(transition) {
    if (!this.me.isAuthenticated) {
      // eslint-disable-next-line ember/no-controller-access-in-routes
      let loginController = this.controllerFor('login');
      loginController.set('previousTransition', transition);
      this.transitionTo('teach.login');
    }
    return super.beforeModel(transition);
  }

  afterModel() {
    this.headTags = this.SeoTags.build(
      'Teach - Wikonnect',
      '/teach',
      undefined,
      false,
      false
    );
  }
}
