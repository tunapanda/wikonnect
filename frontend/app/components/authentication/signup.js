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
          console.log(err.errors[key].detail.split(" "));

          let constraint = err.errors[key].constraint;
          console.log(constraint);

          let details = err.errors[key].detail.split(" ");

          let error_message;
          switch (constraint) {
          case "users_email_unique":
              error_message = "The email " + fields['email'] + " is already in use";
            break;
          case "users_username_unique":
              error_message = "The username - " + fields['username'] + " is already in use";
            break;
          default:
            break;
          }
          // model.addError(details[1], + details[1] + ' should be ' + details[2])
          model.addError(details[1], error_message);
        });
      }
    });
  }

}
