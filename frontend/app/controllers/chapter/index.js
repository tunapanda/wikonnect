import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ChapterIndexController extends Controller {

  flaggingModal = false

  @action
  submit() { }

  @action
  toggleFlaggingModal() {
    this.toggleProperty('ratingsModal');

  }
}
