import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class VerifyController extends Controller {
  queryParams = ['token', 'email'];

  token = null;
  email = null;

  @action
  transitionToIndex() {
    const previousTransition = this.previousTransition;
    if (previousTransition) {
      this.previousTransition = null;

      previousTransition.retry();
    } else {
      this.transitionToRoute('index');
    }
  }
}
