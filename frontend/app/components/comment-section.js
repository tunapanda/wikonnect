import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {computed} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class CommentSectionComponent extends Component {

  @service
  me;

  @service
  session;

  @service
  store;

  @service
  notify;

  @tracked
  comment;


  get commentModel() {
    return this.store.createRecord('comment', {
      user: this.me.user.id,
      chapter: this.me.user.id,
      comment: this.comment
    });
  }

  @computed('me.user.profileUri')
  get profileUri() {
    return this.me.user.profileUri;
  }

  @action
  async saveComment(model) {
    let chap = await this.store.peekRecord('chapter', this.args.selectedChapter);
    model.set('chapter', chap);
    model.save()
      .then(() => {
        this.comment = '';
        this.notify.success('Comment added successfully', {closeAfter: 6000});

      })
      .catch(() => {
        this.comment = model.comment;
        model.deleteRecord();
        this.notify.alert('Be mindful of your comments', {closeAfter: 6000});
      });

  }
}





