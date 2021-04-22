import Controller from '@ember/controller';
import { action } from '@ember/object';
import LoginValidations from '../validations/login';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
  @service socket;

  LoginValidations = LoginValidations;

  @action
  login() {
    this.socket.roleChanged();

    const previousTransition = this.previousTransition;
    if (previousTransition) {
      this.previousTransition = null;

      previousTransition.retry();
    } else {
      this.transitionToRoute('index');
    }
  }
}
