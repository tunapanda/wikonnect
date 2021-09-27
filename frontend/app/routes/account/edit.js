import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AccountEditRoute extends Route {
  @service me;

  async model() {
    return await this.store.find('user', this.me.id);
  }
}
