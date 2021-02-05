import { action } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

// import { tagName } from '@ember-decorators/component';
import LoginValidations from '../../validations/login';

export default
// @tagName('')
class LoginComponent extends Component {
  LoginValidations = LoginValidations;

  @inject
  me;

  @inject
  store;

  @inject
  notify;

  @inject
  torii;

  @inject
  session;

  @tracked loading = false;

  @action
  sessionRequiresAuthentication() {
    this.notify.info('Signing up...', { closeAfter: 5000 });
    const me = this.me;
    this.get('torii')
      .open('google-oauth2')
      .then(function (googleAuth) {
        const googleToken = googleAuth.authorizationToken.access_token;
        console.log(googleAuth);

        me.registerWithGoogle({ googleToken: googleToken, provider: 'google' })
          .then((user) => me.authenticate(user.get('username'), googleToken).then(() => {
            console.log(user.get('username'));
            console.log(user.get('password'));
            console.log(user.get('email'));
            this.transitionToRoute('home');
          }))
      }, function (error) {
        this.notify.info(`Google auth failed: ${error.message}`);
      });
  }


  @action
  login(model) {
    this.loading = true;
    this.me.authenticate(model.get('username'), model.get('password')).then(() => {

      this.authenticationSuccessful();
    }).catch(() => {
      this.loading = false;
      this.notify.alert('Login failed, Check your username and password and try again', { closeAfter: 6000 });
      // if (err.json && err.json.errors) {
      //   Object.keys(err.json.errors).forEach(field => {
      //     model.addError(err.json.errors[field].constraint, err.json.errors[field].name);
      //   });
      // }
    });


  }
}