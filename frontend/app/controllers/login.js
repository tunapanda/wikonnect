import Controller from '@ember/controller';
import { action } from '@ember/object';
import LoginValidations from '../validations/login';



export default class LoginController extends Controller {

  LoginValidations = LoginValidations;

  @action
  login() {
    let previousTransition = this.get('previousTransition');
    if (previousTransition) {
      this.set('previousTransition', null);
      previousTransition.retry();
    } else {
      this.transitionToRoute('/home');
    }
  }
}
