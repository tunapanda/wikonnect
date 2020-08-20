import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class ProfileRoute extends Route {

  @inject
  me;

  async beforeModel() {
    if (!this.me.isAuthenticated) {
      this.transitionTo('login');
    }
    return await this.store.findRecord('user', this.me.user.id);
  }

  async model() {
    return await this.me.user;
  }
}
