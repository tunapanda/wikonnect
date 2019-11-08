import Component from '@ember/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class AuthenticationLoginComponent extends Component {

    @inject
    me;

    @inject
    store;

    @action
    submit(model) {
      this.logIn(model);
    }

}

