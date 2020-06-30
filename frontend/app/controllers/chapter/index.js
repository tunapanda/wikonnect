import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ChapterIndexController extends Controller {

  ratingsModal = false

  @action
  submit() { }

  @action
  toggleRatingsModal() {
    this.toggleProperty('ratingsModal');

  }
}
