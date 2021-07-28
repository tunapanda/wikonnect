import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class LearnController extends Controller {
  @service router;

  get isChaptersRoute() {
    return this.router.currentRouteName === 'learn.chapters';
  }
}
