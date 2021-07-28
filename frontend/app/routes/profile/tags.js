import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileTagsRoute extends Route {
  @service infinity;
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

  model() {
    return Promise.all([
      this.store.query('tag', {
        include: 'tagsfollowers',
        includeAggregates: true,
        followerId: this.me.id,
      }),
      this.store.query('course', { limit: 5, type: 'popular' }),
      this.store.query('tag', { limit: 5, type: 'popular' }),
    ]);
  }
}
