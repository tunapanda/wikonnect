import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import UserValidation from '../validations/user';

export default class SignupController extends Controller {

    @inject
    me;

    UserValidation = UserValidation;

    @action
    registerUser(model) {
      let fields = model.getProperties('username', 'email', 'password');

      this.me.register(fields).then(() =>
        this.me.authenticate(model.get('username'), model.get('password')).then(() =>
          this.transitionToRoute('index')),
      err => {
        if (err && err.errors) {
          Object.keys(err.errors).forEach(field => {
            model.addError(field, err.errors[field]);
          });
        }
      });
    }

}
