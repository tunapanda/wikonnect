import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class TeachCreateController extends Controller {
  @service router;


  tag = A([]);


  @action
  addTag(tag) {
    this.tag.pushObject(tag);
  }
  @action
  removeTagAtIndex(index) {
    this.tag.removeAt(index);
  }

  @action
  addTags(newTags) {
    this.tags.addObject(newTags);
  }

  @action
  replaceTagAtIndex(tag, index) {
    this.tags.replace(index, 1, [tag]);
  }

  @action
  replaceTagWithTagsAtIndex(tags, index) {
    this.tags.replace(index, 1, tags);
  }


  @action
  saveChapter(model) {
    model.setProperties({
      status: 'draft',
      contentType: 'h5p',
      approved: false
    });
    model.save().then((x) => {
      this.transitionToRoute('teach.tag', x.id);

    });

  }

}
