import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class TeachCreateController extends Controller {
  @service router;


  @action
  saveChapter(model) {
    model.setProperties({
      status: "draft",
      approved: false
    });
    model.save().then((x) => {
      this.transitionToRoute('teach.preview', x.id);

    });

  }

}
