import Route from '@ember/routing/route';
import { inject as service, inject } from '@ember/service';

export default class LoginRoute extends Route {
  @inject me;
  @service SeoTags;

  beforeModel() {
    if (this.me.user) {
      this.transitionTo('index');
    }
  }

  model() {
    return this.store.createRecord('user');
  }

  afterModel() {
    this.headTags = this.SeoTags.build('Login - Wikonnect', '/login');
  }
}
