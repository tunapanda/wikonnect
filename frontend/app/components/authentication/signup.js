import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import UserValidation from '../../validations/user';

export default class AuthenticationSignupComponent extends Component {
  UserValidation = UserValidation;

  @inject
  me;

  @inject
  session;

  @inject
  store;

  @action
  createUser(model) {
    let fields = model.getProperties('username', 'email', 'password');

    this.me.register(fields).then(() => this.me.authenticate(model.get('username'), model.get('password')).then(() => this.success()), err => {
      if (err && err.errors) {


        Object.keys(err.errors).forEach(key => {
          let constraint = err.errors[key].constraint.split("_");

          let error_message;
          switch (constraint[1]) {
          case "email":
            error_message = "This email is already in use";
            break;
          case "username":
            error_message = "This username already exists";
            break;
          default:
            error_message = err.errors[key].errors;
            break;
          }
          model.addError(constraint[1], error_message);
        });
      }
    });
  }

}
