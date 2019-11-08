import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import LoginValidations from '../validations/login';


export default class LoginController extends Controller {

    LoginValidations = LoginValidations;

    @inject
    me;


    @action
    login(model) {
      this.me.authenticate(model.get('username'), model.get('password')).then(() => {
        this.transitionToRoute('/');
      }).catch(err => {
        if (err.json && err.json.errors) {
          Object.keys(err.json.errors).forEach(field => {
            model.addError(field, err.json.errors[field]);
          });
        }
      });
    }
}
