import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CommentSectionComponent extends Component {

  @service
  me


  @service
  session;



  @service
  store;


  get commentModel() {
    return this.store.createRecord('comment', {
      creator: this.me.get('user')
    });
  }
  @computed
  get chapterComments() {

    return this.store.query('comment', { "chapterId": this.args.selectedChapter });
  }

  @action
  async saveComment(model) {
    let chap = await this.store.findRecord('chapter', this.args.selectedChapter);
    console.log(model)
    model.setProperties({
      chapter: chap
    });
    model.save();
  }
}

