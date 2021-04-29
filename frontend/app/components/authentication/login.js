import { action } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import LoginValidations from '../../validations/login';

export default class LoginComponent extends Component {
  LoginValidations = LoginValidations;

  @inject me;
  @inject store;
  @inject notify;
  @inject config;
  @inject session;

  @tracked loading = false;

  @action
  authenticateWithGoogleImplicitGrant() {
    const clientId = this.config.get('google').apiKey;
    const redirectURI = `${window.location.origin}/callback`;
    const responseType = 'token';
    const scope = 'profile email';
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
  authenticateWithGitHub() {
    this.session.authenticate('authenticator:torii', 'github');
  }

  @action
  login(model) {
    this.loading = true;
    this.me
      .authenticate(model.get('username'), model.get('password'))
      .then(() => {
        this.args.authenticationSuccessful();
      })
      .catch(() => {
        this.loading = false;
        this.notify.alert(
          'Login failed, Check your username and password and try again',
          { closeAfter: 6000 }
        );
      });
  }
}
