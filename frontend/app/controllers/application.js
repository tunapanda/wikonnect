import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service session;
  @service me;
  @service router;
  @service socket;

  @tracked showRedirectModal = false;
  @tracked redirectUrl = '';

  headerStyles = {
    default: 'white-header',
    home: 'orange-header',
    login: 'auth-header',
    signup: 'auth-header',
    upload: 'auth-header',
    'cms.index': 'green-header',
    profile: 'yellow-header',
  };

  constructor() {
    super(...arguments);

    this.socket.socket.on('redirect', (data) => {
      this.showRedirectModal = true;
      this.redirectUrl = data.redirectUrl.replace(/"/g, '');
    });
  }

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
  async logout() {
    await this.me.logout();
    this.socket.roleChanged();
    this.router.transitionTo('index');
  }
  get isAdminRoute() {
    return this.route.startsWith('admin');
  }
  @action
  loadUserNotifications() {
    if (
      this.me.isAuthenticated &&
      this.session.data?.authenticated?.tokenData?.data?.id
    ) {
      return this.store.query('notification', {
        recipientId: this.session.data?.authenticated?.tokenData?.data?.id,
      });
    }
  }
}
