// import Component from '@glimmer/component'; @jake
import Component from '@ember/component';
import { inject } from '@ember/service';
import { action, computed } from '@ember/object';
import UserValidation from '../../validations/user';

export default class AuthenticationSignupComponent extends Component {
    UserValidation = UserValidation;

    @inject
    me;

    @inject
    store;

    @computed
    get user() {
        return this.store.createRecord('user')
    }

    @action
    submit(model) {
        model.save()
    }

}
