import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import UserValidation from '../validations/user';

export default class SignupController extends Controller {

  @inject
  me;

  UserValidation = UserValidation;

  @action
  signupSuccess() {
    this.transitionToRoute('index');
  }

}
