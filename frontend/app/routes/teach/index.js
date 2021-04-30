import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class TeachIndexRoute extends Route {
  @service session;
  @service me;

  async model() {
    return {
      chapters: await this.store.query('chapter', {
        creatorId: this.me.user.id,
        status: 'draft',
      }),
      notifications: await this.store.query('notification', {
        recipientId: this.me.user.id,
      }),
    };
  }
}
