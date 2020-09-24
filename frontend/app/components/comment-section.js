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

  init() {
    console.log("init")
  }

  @computed('me.user.profileUri')
  get profileUri() {
    return this.me.user.profileUri;
  }


  @computed()
  get chapterComments() {
    return this.store.query('comment', { "chapterId": this.args.selectedChapter });
  }

  @action
  async saveComment(model) {
    let notice = this.notify;
    let allComments = this.chapterComments;
    let chap = await this.store.findRecord('chapter', this.args.selectedChapter);
    model.setProperties({
      chapter: chap
    });
    model.save().then(function (model) {
      // save worked
    }, function (error) {
      notice.alert("Be mindful of your comments")
    })

  }
}





