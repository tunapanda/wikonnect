import { action } from '@ember/object';
import { inject } from '@ember/service';
import Component from '@ember/component';
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

  @action
  login(model) {
    this.notify.info('Logging in ...', { closeAfter: 5000 });
    this.me.authenticate(model.get('username'), model.get('password')).then(() => {
      this.notify.info('Login successful. Redirecting', { closeAfter: 2000 });

      this.authenticationSuccessful();
    }).catch(err => {
      this.notify.alert('failed', { closeAfter: 6000 });

      if (err.json && err.json.errors) {
        Object.keys(err.json.errors).forEach(field => {
          model.addError(err.json.errors[field].constraint, err.json.errors[field].name);
        });
      }
    });
  }
}