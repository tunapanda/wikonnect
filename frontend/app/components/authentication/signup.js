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
  store;

  @action
  createUser(model) {
    let fields = model.getProperties('username', 'email', 'password');

    this.me.register(fields).then(() => this.me.authenticate(model.get('username'), model.get('password')).then(() => this.success()), err => {
      if (err && err.errors) {
        Object.keys(err.errors).forEach(field => {
          model.addError(field, err.errors[field]);
        });
      }
    });
  }

}
