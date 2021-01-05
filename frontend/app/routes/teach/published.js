import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachPublishedRoute extends Route {
  @service session;
  @tracked token = this.session.data.authenticated.token

  @service me
  async model() {
    return this.store.query('chapter', { 'creatorId': this.me.user.id, 'status': "published" });
  }
}
