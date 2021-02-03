import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {computed} from '@ember/object';

export default class CommentSectionComponent extends Component {

  @service
  me;

  @service
  session;

  @service
  store;

  @service
  notify;


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

  @action
  async saveComment(model) {
    let chap = await this.store.peekRecord('chapter', this.args.selectedChapter);
    model.setProperties({
      chapter: chap
    });
    model.save()
      .then(() => {
        this.notify.success('Comment added successfully', { closeAfter: 6000 });

      })
      .catch(() => {
        this.notify.alert('Be mindful of your comments',{closeAfter: 6000});
      });

  }
}





