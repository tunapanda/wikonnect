// import Component from '@glimmer/component'; @jake
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

          let details = err.errors[key].detail.split("_");

          let error_message;
          switch (details[2]) {
            case "unique":
              error_message = "The " + details[1] + " is already in use";
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
