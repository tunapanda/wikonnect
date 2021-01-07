import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachPreviewRoute extends Route {

  @inject
  me
  @tracked token = this.session.data.authenticated.token




  model() {


    if (this.token) {
      return this.store.query('chapter', { 'creatorId': this.me.user.id, 'status': 'published' });

    } else {
      return true;

    }


  }
}
