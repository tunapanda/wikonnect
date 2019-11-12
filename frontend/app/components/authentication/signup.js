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
    submit(newUser) {
      this.registerUser(newUser);
    }

}
