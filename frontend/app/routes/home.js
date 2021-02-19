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

  async afterModel(model) {
    set(this, 'headData.title', 'Wikonnect - Chapters');
    set(this, 'headData.theme', '#FF5722');

    /*Get user chapter reactions if they are already authenticated*/
    return {
      reactions: this.me.isAuthenticated ?
        this.store.query('reaction', {'chapterId': model.id, 'user_id': this.me.user.id}) : []
    };

  }

  model() {
    return this.store.query('chapter', {'approved': true});
  }
}
