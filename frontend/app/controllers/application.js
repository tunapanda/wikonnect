import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';

// import settings from './config/settings';


export default class ApplicationController extends Controller {

  headerStyles = {
    'default': 'white-header',
    'home': 'orange-header',
    'login': 'auth-header',
    'signup': 'auth-header',
    'upload': 'auth-header',
    'cms.index': 'green-header',
    'profile': 'yellow-header'
  }

  @inject
  session;

  @inject
  me;

  // @computed('currentRouteName')
  // get headerStyle() {
  //   let route = this.get('currentRouteName');
  //   if (Object.keys(this.headerStyles).includes(route)) {
  //     return this.headerStyles[route];
  //   }
  //   else {
  //     return this.headerStyles.default;
  //   }
  // }

  // @computed('currentRouteName')
  // get route() {
  //   return this.get('currentRouteName');

  // }



  @action
  logout() {
    this.me.logout();
    document.location.reload();
    this.transitionToRoute('home');
  }



}
