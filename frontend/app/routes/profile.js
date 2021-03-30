import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service me;
  @service SeoTags;

  async beforeModel() {
    if (!this.me.isAuthenticated) {
      this.transitionTo('login');
    }
    return await this.store.findRecord('user', this.me.user.id);
  }

  async model() {
    return await this.me.user;
  }
  afterModel() {
    this.headTags = this.SeoTags.build(
      'View User Profile - Wikonnect',
      '/profile',
      undefined,
      false,
      false
    );
  }
}
