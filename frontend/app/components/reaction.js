import Component from "@glimmer/component";
import { inject } from "@ember/service";
import { action } from "@ember/object";

export default class ReactionComponent extends Component {
  @inject
  me;

  @inject
  store;

  @action
  like(chapterId) {
    if (this.me.isAuthenticated) {
      this.store.createRecord("reaction", {
        reaction: "like",
        userId: this.me.user.id,
        chapterId: chapterId,
      }).save();
    }
  }

  @action
  dislike(chapterId) {
    if (this.me.isAuthenticated) {
      this.store.createRecord("reaction", {
        reaction: "dislike",
        userId: this.me.user.id,
        chapterId: chapterId,
      }).save();
    }
  }
}