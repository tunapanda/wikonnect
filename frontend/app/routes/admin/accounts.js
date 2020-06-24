import Route from '@ember/routing/route';
// import { inject } from '@ember/service';


export default class AdminAccountsRoute extends Route {

  // @inject
  // me;

  model() {
    return this.store.findAll('user');
  }

}
