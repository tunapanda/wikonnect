import Route from '@ember/routing/route';
import {inject, inject as service} from '@ember/service';
import {set} from '@ember/object';

export default class HomeRoute extends Route {

  @inject
  me;

  @inject
  config;

  @service
  headData;

  async afterModel() {
    set(this, 'headData.title', 'Wikonnect - Chapters');
    set(this, 'headData.theme', '#FF5722');
    if (this.me.isAuthenticated) {
      return this.store.query('reaction', {user_id: this.me.user.id});
    }
  }

  model() {
    console.log('config');
    console.log(this.config);
    console.log(this.config.content.APP);
    return this.store.query('chapter', {'approved': true});
    //return this.store.findAll('chapter');
  }
}
