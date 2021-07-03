import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfilePeopleRoute extends Route {
  @service me;
  @service infinity;

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
      this.infinity.model('user', {
        include: 'userfollowees',
        followerId: this.me.id,
        aggregate: 'userFollowers,enrolledCourses,followedTags',
        perPage: 10,
        startingPage: 0,
      }),
      this.store.query('course', { limit: 5, type: 'popular' }),
      this.store.query('tag', { limit: 5, type: 'popular' }),
    ]);
  }
}
