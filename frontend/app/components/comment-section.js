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

  get commentModel() {
    return this.store.createRecord('comment', {
      creator: this.me.user.id
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
    let chap = await this.store.findRecord('chapter', this.args.selectedChapter);
    model.setProperties({
      chapter: chap
    });
    model.save().catch(function () {
      if (model.get('isError')) {
        model.get('errors').add('comment', 'Be mindful of your comments');
        let errors = model.get('errors').errorsFor('comment')
        console.log(errors[0]);
        return errors[0];
      }
    });
  }
}





