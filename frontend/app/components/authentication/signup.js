import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import UserValidation from '../../validations/user';

export default class AuthenticationSignupComponent extends Component {
  UserValidation = UserValidation;

  @service me;
  @service notify;
  @service session;
  @service store;
  @service config;
  userLoginForm;

  constructor() {
    super(...arguments);
    this.userLoginForm = new UserForm();
  }
  @action
  authenticateWithGoogleImplicitGrant() {
    let clientId = this.config.get('google').apiKey;
    let redirectURI = `${window.location.origin}/callback`;
    let responseType = 'token';
    let scope = 'profile email';
    window.location.replace(
      'https://accounts.google.com/o/oauth2/v2/auth?' +
        `client_id=${clientId}` +
        `&redirect_uri=${redirectURI}` +
        `&response_type=${responseType}` +
        `&scope=${scope}`
    );
  }

  @action
  authenticateWithLinkedIn() {
    this.session.authenticate('authenticator:torii', 'linkedin');
  }

  @action
  authenticateWithFacebook() {
    this.session.authenticate('authenticator:torii', 'facebook');
  }

  @action
  createUser(model) {
    let fields = {
      username: model.username,
      email: model.email,
      password: model.password,
      inviteCode: model.inviteCode,
    };

    this.me
      .register(fields)
      .then(() =>
        this.me
          .authenticate(model.username, model.password)
          .then(() => this.args.success())
      )
      .catch((err) => {
        if (err && err.errors) {
          Object.keys(err.errors).forEach((key) => {
            let constraint = err.errors[key].constraint.split('_');
            let error_message;
            switch (constraint[1]) {
              case 'email':
                error_message = err.errors[key].detail;
                break;
              case 'username':
                error_message = 'This username already exists';
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

class UserForm {
  @tracked username;
  @tracked email;
  @tracked firstname;
  @tracked lastname;
  @tracked password;
  @tracked passwordConfirmation;
}
