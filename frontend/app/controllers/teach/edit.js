import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TeachEditController extends Controller {

  @action
  saveChapter(model) {
    model.setProperties({
      status: 'draft',
      contentType: 'h5p',
      approved: false
    });
    model.save().then((x) => {
      this.transitionToRoute('teach.preview', x.id);

    });

  }
}
