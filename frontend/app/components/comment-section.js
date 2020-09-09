import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { computed } from '@ember/object';

export default class CommentSectionComponent extends Component {

  @service
  me

  @service
  session;

  @service
  store;

  @service
  notify

  get commentModel() {
    return this.store.createRecord('comment', {
      user: this.me.user.id,
      chapter: this.me.user.id
    });
  }

  @computed('me.user.profileUri')
  get profileUri() {
    return this.me.user.profileUri;
  }


  @computed
  get chapterComments() {

    return this.store.query('comment', { "chapterId": this.args.selectedChapter });

  }

  @action
  async saveComment(model) {
    let notice = this.notify.alert('Be mindful of your comments', { closeAfter: 10000 });
    let chap = await this.store.findRecord('chapter', this.args.selectedChapter);
    model.setProperties({
      chapter: chap
    });
    model.save().catch(function () {
      if (model.get('isError')) {
        return notice;
      }
    });
  }
}





