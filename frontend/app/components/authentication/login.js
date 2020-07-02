import { action, computed } from '@ember/object';
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

  @computed()
  get user() {
    return this.store.createRecord('user');
  }


  @action
  login(model) {
    this.me.authenticate(model.get('username'), model.get('password')).then(() => {
      this.authenticationSuccessful();
    }).catch(err => {
      if (err.json && err.json.errors) {
        Object.keys(err.json.errors).forEach(field => {
          model.addError(err.json.errors[field].constraint, err.json.errors[field].name);
        });
      }
    });
  }
}