import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class ProfileRoute extends Route {

  @inject
  me;

  async beforeModel() {
    return await this.store.findRecord('user', this.me.user.id);
  }

  async model() {
    return await this.me.user;
  }


}
