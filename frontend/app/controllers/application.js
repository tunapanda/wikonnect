import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class ApplicationController extends Controller {

  headerStyles = {
    'default': 'white-header',
    'home': 'orange-header',
    'login': 'auth-header',
    'signup': 'auth-header',
    'upload': 'auth-header',
    'profile': 'auth-header',
    'cms.index': 'green-header',
  }

  @inject
  session;

  @inject
  me;

  @computed('currentRouteName')
  get headerStyle() {
    let route = this.get('currentRouteName');
    if (Object.keys(this.headerStyles).includes(route)) {
      return this.headerStyles[route];
    }
    else {
      return this.headerStyles.default;
    }
  }

  @action
  logout() {
    this.me.logout();
    document.location.reload();
    this.transitionToRoute('home');
  }



}
