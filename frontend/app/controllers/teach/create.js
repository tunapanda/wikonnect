import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TeachCreateController extends Controller {
  @service router;


  @action
  saveChapter(model) {
    model.setProperties({
      status: "draft",
      approved: false
    });
    let chapter = model.save().then((x) => {
      console.log(x.id)
      this.transitionToRoute('chapter', x.id);

    });

  }

}
