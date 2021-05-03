import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AdminSidenavComponent extends Component {
  @tracked collapseUserMenu = true;
  @tracked badgesMenuCollapsed = true;

  @action
  toggleUserMenu() {
    this.collapseUserMenu = !this.collapseUserMenu;
  }
  @action
  toggleBadgesMenu() {
    this.badgesMenuCollapsed = !this.badgesMenuCollapsed;
  }
}
