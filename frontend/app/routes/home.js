import Route from '@ember/routing/route';
import { inject } from '@ember/service';


export default class HomeRoute extends Route {

  @inject
  me;

  async model() {



    let approved = await this.store.query('chapter', { "approved": true });
    return approved;
  }
}
