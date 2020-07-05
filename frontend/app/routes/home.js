import Route from '@ember/routing/route';
import { inject, inject as service } from '@ember/service';
import { set } from '@ember/object';

export default class HomeRoute extends Route {

  @inject
  me;

  @service
  headData;



  // async model() {
  //   let approved = await this.store.query('chapter', { "approved": true });
  //   return approved;
  // }

  async afterModel() {
    set(this, 'headData.title', 'Wikonnect - Chapters');
    set(this, 'headData.theme', '#FF5722');
  }
}
