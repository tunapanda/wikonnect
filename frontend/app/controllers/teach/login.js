import { action } from '@ember/object';
import { inject } from '@ember/service';
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import LoginValidations from '../../validations/login';

export default class TeachLoginController extends Controller {
  LoginValidations = LoginValidations;

  @inject me;
  @inject store;
  @inject notify;
  @inject config;
  @inject session;

  @tracked loading = false;

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
        this.transitionToRoute('teach.index');
      })
      .catch(() => {
        this.loading = false;
        // this.notify.alert(
        //   'Login failed, Check your username and password and try again',
        //   { closeAfter: 6000 }
        // );
      });
  }
}
