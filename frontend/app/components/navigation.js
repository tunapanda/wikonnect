import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';
export default class NavigationComponent extends Component {

  @inject
  me;

  @action
  closenav() {
    document.getElementById("mySidenav").style.width = "0";
  }
}
