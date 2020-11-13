import Route from '@ember/routing/route';
import { inject, inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class HomeRoute extends Route {

  @inject
  me;

  @service
  headData;

  async afterModel() {
    set(this, 'headData.title', 'Wikonnect - Chapters');
    set(this, 'headData.theme', '#FF5722');
  }

  model() {
    return this.store.query('chapter', { 'approved': true })
  }
}
