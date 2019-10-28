import Controller from '@ember/controller';
import { action } from '@ember/object';
import UserValidation from '../validations/user';

export default class SignupController extends Controller {

    UserValidation = UserValidation;

    @action
    registerUser(model) {
        model.save()
    }

}
