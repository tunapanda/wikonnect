import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class TeachEditController extends Controller {
  @action
  saveChapter(model) {
    model.setProperties({
      status: 'draft',
      contentType: 'h5p',
      approved: false,
    });
    model.save().then((x) => {
      if (model.contentUri && !model.contentId) {
        this.transitionToRoute('teach.h5p-upload', x.id);
      } else {
        this.transitionToRoute('teach.h5p-editor', x.id);
      }
    });
  }
}
