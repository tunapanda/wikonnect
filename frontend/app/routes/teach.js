import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';

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

  model() {
    if (this.me.isAuthenticated) {
      return RSVP.hash({
        drafts: this.store.query('chapter', {
          creatorId: this.me.user.id,
          status: 'draft',
        }),
        published: this.store.query('chapter', {
          creatorId: this.me.user.id,
          status: 'published',
        }),
      });
    }
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
