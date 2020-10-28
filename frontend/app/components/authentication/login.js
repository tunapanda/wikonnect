import { action } from '@ember/object';
import { inject, inject as service } from '@ember/service';
import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';

// import { tagName } from '@ember-decorators/component';
import LoginValidations from '../../validations/login';

export default
// @tagName('')
class LoginComponent extends Component {
  LoginValidations = LoginValidations;

  @service
  session

  @inject
  me;

  @inject
  store;

  @inject
  notify;

  @tracked loading = false;

  @action
  authenticateWithFacebook() {
    this.get('session').authenticate('authenticator:torii', 'facebook');
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