import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

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

  @action
  saveComment(model) {
    console.log(model)
    // model.setProperties({
    //   chapter_id: "1"
    // });
    // model.save();
  }
}

