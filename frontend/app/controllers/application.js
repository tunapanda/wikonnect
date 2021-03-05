import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service session;
  @service me;
  @service router;

  headerStyles = {
    default: 'white-header',
    home: 'orange-header',
    login: 'auth-header',
    signup: 'auth-header',
    upload: 'auth-header',
    'cms.index': 'green-header',
    profile: 'yellow-header',
  };

  get headerStyle() {
    let route = this.router.currentRouteName;
    if (Object.keys(this.headerStyles).includes(route)) {
      return this.headerStyles[route];
    } else {
      return this.headerStyles.default;
    }
  }

  get route() {
    return this.router.currentRouteName;
  }

  @action
  logout() {
    this.me.logout();
    document.location.reload();
    this.router.transitionTo('home');
  }
}
