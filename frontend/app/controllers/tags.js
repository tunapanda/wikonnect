import Controller from '@ember/controller';
// import { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagsController extends Controller {

  @tracked list = ["Literacy", "STEM", "Environmental conservation", "Emotional well-being", "Life skills and values",
    "Fitness and nutrition", "Creative arts", "Community service", "Learners with special needs", "Music and movement", "Entrepreneurship",
    "Health and safety", "Language Learning"]
  @tracked mylist = []



  @action
  addme(item) {
    this.list.removeObject(item);
    this.mylist.addObject(item);
  }

  @action
  removeme(item) {
    this.list.addObject(item);
    this.mylist.removeObject(item);
  }

  @action
  updateTags() {
    this.transitionToRoute('upload', { queryParams: { signup: 'true' } });

  }

}
