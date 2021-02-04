import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject } from "@ember/service";
import { action } from "@ember/object";

export default class ReactionComponent extends Component {
  @inject
  me;

  @inject
  store;

  @tracked likes = this.args.likes;
  @tracked dislikes = this.args.dislikes;

  @action
  like(chapterId) {

    if (this.me.isAuthenticated) {
      const chapter = this.store.peekRecord("chapter", chapterId);
      const userId = this.me.user.id;

      if (chapter.reaction.authenticated_user === null) {
        this.store
          .createRecord("reaction", {
            reaction: "like",
            userId: userId,
            chapterId: chapterId,
          })
          .save();
          this.likes++;
      } else if (chapter.reaction.authenticated_user === "like") {
        this.likes--;
        this.store.findAll("reaction").then((reactions) => {
          const reaction = reactions.find(
            (reaction) =>
              reaction.chapterId === chapterId &&
              reaction.userId === userId &&
              reaction.reaction === "like"
          );

          reaction.destroyRecord();
        });
      } else if (chapter.reaction.authenticated_user === "dislike") {
        this.like++;
        this.dislike--;
        this.store.findAll("reaction").then((reactions) => {
          const reaction = reactions.find(
            (reaction) =>
              reaction.chapterId === chapterId &&
              reaction.userId === userId &&
              reaction.reaction === "dislike"
          );

          reaction.destroyRecord();
          this.store
            .createRecord("reaction", {
              reaction: "like",
              userId: userId,
              chapterId: chapterId,
            })
            .save();
        });
      }
    }
  }

  @action
  dislike(chapterId) {
    if (this.me.isAuthenticated) {
      const chapter = this.store.peekRecord("chapter", chapterId);
      const userId = this.me.user.id;

      if (chapter.reaction.authenticated_user === null) {
        this.store
          .createRecord("reaction", {
            reaction: "dislike",
            userId: userId,
            chapterId: chapterId,
          })
          .save();
          this.dislikes++;
      } else if (chapter.reaction.authenticated_user === "like") {
        this.store.findAll("reaction").then((reactions) => {
          const reaction = reactions.find(
            (reaction) =>
              reaction.chapterId === chapterId &&
              reaction.userId === userId &&
              reaction.reaction === "like"
          );

          reaction.destroyRecord();
        });
        this.store
          .createRecord("reaction", {
            reaction: "dislike",
            userId: userId,
            chapterId: chapterId,
          })
          .save();
          this.likes--;
          this.dislikes++;
      } else if (chapter.reaction.authenticated_user === "dislike") {
        this.store.findAll("reaction").then((reactions) => {
          const reaction = reactions.find(
            (reaction) =>
              reaction.chapterId === chapterId &&
              reaction.userId === userId &&
              reaction.reaction === "dislike"
          );

          reaction.destroyRecord();
        });
        this.dislikes--;
      }
    }
  }
}
