import Route from '@ember/routing/route';
import {inject} from '@ember/service';


export default class ChapterIndexRoute extends Route {
  @inject
  me;

  model(params) {
    return this.store.findRecord('chapter', params.chapter_slug);
  }

  afterModel(model) {
    return {
      comments: this.store.query('comment', {'chapterId': model.id}),
      //since there is no reaction ID in the model, query to return an array
      reactions: this.me.isAuthenticated ?
        this.store.query('reaction', {'chapterId': model.id, 'user_id': this.me.user.id}) : []
    };
  }
}
