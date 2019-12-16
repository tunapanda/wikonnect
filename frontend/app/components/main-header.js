import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';




export default class MainHeaderComponent extends Component {

  @inject
  me;

  @action
  opennav() {
    document.getElementById("mySidenav").style.width = "100%";
  }

  @action
  closenav() {
    document.getElementById("mySidenav").style.width = "0";
  }


}
