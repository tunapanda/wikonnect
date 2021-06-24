import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AdminMainHeaderComponent extends Component {
  @service me;
  @service router;
  @service socket;

  @action
  logout() {
    this.me.logout();
    document.location.reload();
    this.socket.roleChanged();
    this.router.transitionTo('index');
  }
}
