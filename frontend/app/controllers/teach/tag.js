import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TeachTagController extends Controller {
  @inject me;


  @tracked tag;

  tags = [];


  @action
  addtag() {
    if (this.tag) {
      this.tags.pushObject(this.tag);
      this.set("tag", "");
    }
  }

  @action
  async updateTags() {
    let id = this.get("model").id;

    console.log(id);
    let chapter = await this.store.findRecord('chapter', id);
    chapter.set("tags", this.tags);
    chapter.save();
    this.transitionToRoute('teach.preview', id);

  }

}
