import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class ApplicationRoute extends Route {

  @inject
  session;

  @inject
  me;

  queryParams = { test: '' };

  model(params) {
    window.localStorage.setItem('test', params.test);
    console.log(params.test);
  }

  beforeModel() {
    return this._loadMe();
  }

  _loadMe() {
    return this.me.load();
  }
}
