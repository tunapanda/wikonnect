import Controller from '@ember/controller';
import { action } from '@ember/object';
import LoginValidations from '../validations/login';



export default class LoginController extends Controller {

  LoginValidations = LoginValidations;

  profileComplete = this.me.user.profileComplete;

  @action
  login() {
    if (this.profileComplete) {
      this.transitionToRoute('/profilecomplete')
    } else {
      this.transitionToRoute('/home')
    }
  }
}
