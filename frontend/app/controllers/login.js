import Controller from '@ember/controller';
import { action } from '@ember/object';


export default class LoginController extends Controller {
  @action
  login() {
    this.transitionToRoute('/');
  }
}
