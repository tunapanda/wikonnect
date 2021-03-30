import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachLoginRoute extends Route {
  @service me;
  @service SeoTags;

  beforeModel() {
    if (this.me.user) {
      this.transitionTo('teach.index');
    }
  }

  model() {
    return this.store.createRecord('user');
  }

  afterModel() {
    this.headTags = this.SeoTags.build('Teach - Wikonnect', '/teach/login');
  }
}
