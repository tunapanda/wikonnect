import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import UserValidation from '../validations/user';

export default class SignupController extends Controller {
  @service me;
  @service config;

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
