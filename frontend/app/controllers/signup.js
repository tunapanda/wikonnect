import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import UserValidation from '../validations/user';

export default class SignupController extends Controller {

  @inject
  me;

  @inject
  config

  queryParams = ['invite_code'];


  UserValidation = UserValidation;

  @action
  signupSuccess() {
    if (this.config.content.APP.use_preset_tags) {
      this.transitionToRoute('tags');
    } else {
      this.transitionToRoute('upload');

    }
  }

}
