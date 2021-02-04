import Component from "@glimmer/component";
import { inject } from "@ember/service";
import { action } from "@ember/object";

export default class ReactionComponent extends Component {
  @inject
  me;

  @action
  like() {
    if (this.me.isAuthenticated) {
      console.log(this.me.user.id);
    }
  }

  @action
  dislike() {
    if (this.me.isAuthenticated) {
      console.log("dislike");
    }
  }
}