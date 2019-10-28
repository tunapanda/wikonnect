import Component from '@ember/component';
import LoginValidations from '../../validations/login';
import { inject } from '@ember/service';
import { action, computed } from '@ember/object';

export default class AuthenticationLoginComponent extends Component {
    LoginValidations = LoginValidations;

    @inject
    me;

    @inject
    store;

    @computed
    get user() {
        return this.store.createRecord('user')
    }

    @action
    login(model) {
        this.me.authenticate(model.get('username'), model.get('password')).then(() => {
            this.authenticationSuccessful();
        }).catch(err => {
            if (err.json && err.json.errors) {
                Object.keys(err.json.errors).forEach(field => {
                    model.addError(field, err.json.errors[field]);
                })
            }
        });
    }

}

