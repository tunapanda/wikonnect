import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class CmsLessonCreateController extends Controller {
  @action
  async submit() {
    this.model.save();
  }
}
