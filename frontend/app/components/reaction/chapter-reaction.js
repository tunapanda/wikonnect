import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class ReactionChapterReactionComponent extends Component {
  @service me;
  @service store;

  @tracked
  likes = +(this.args.chapter?.reaction[0]
    ? this.args.chapter.reaction[0]?.likes
    : 0);

  @tracked
  dislikes = +(this.args.chapter?.reaction[0]
    ? this.args.chapter.reaction[0]?.dislikes
    : 0);

  get chapter() {
    return this.args.chapter;
  }

  @tracked
  hasLiked =
    !this.me.isAuthenticated ||
    !this.args.chapter?.reaction[0] ||
    !this.chapter?.authenticatedUser
      ? false
      : this.chapter.authenticatedUser === 'like';

  @tracked
  hasDisliked =
    !this.me.isAuthenticated ||
    !this.args.chapter?.reaction[0] ||
    !this.chapter?.authenticatedUser
      ? false
      : this.chapter.authenticatedUser === 'dislike';

  @action
  async userChapterReaction(chapter, liked = true) {
    if (!this.me.isAuthenticated || this.args.canReact === false) {
      return;
    }

    //if they have none, post
    if (!this.hasLiked && !this.hasDisliked) {
      return this.createUserChapterReaction(chapter, liked)
        .then(() => {
          this.updateUserReaction(liked);
          this.updateReactionsCount(chapter, liked ? 1 : 0, liked ? 0 : 1);
        })
        .catch(() => {});
    }

    let previousReaction = (
      await this.store.query('reaction', {
        chapterId: this.chapter.id,
        user_id: this.me.user.id,
      })
    ).find((reactions) => reactions.chapter.get('id') === this.chapter.id);

    //if is the same, they have retracted it, delete/undo the reaction
    if (
      (this.hasLiked && liked === true) ||
      (this.hasDisliked && liked === false)
    ) {
      return this.deleteUserChapterReaction(previousReaction)
        .then(() => {
          this.updateUserReaction();
          this.updateReactionsCount(chapter, liked ? -1 : 0, liked ? 0 : -1);
        })
        .catch(() => {});
    }

    // if they switch, update the reaction
    return this.updateUserChapterReaction(previousReaction, liked)
      .then(() => {
        this.updateUserReaction(liked);
        this.updateReactionsCount(chapter, liked ? 1 : -1, liked ? -1 : 1);
      })
      .catch(() => {});
  }

  async createUserChapterReaction(chapter, liked) {
    const model = this.store.createRecord('reaction', {
      reaction: liked ? 'like' : 'dislike',
      chapter: chapter,
      user: this.me.user,
    });
    return await model.save();
  }

  async deleteUserChapterReaction(reaction) {
    return await reaction.destroyRecord();
  }

  async updateUserChapterReaction(reaction, liked) {
    reaction.reaction = liked ? 'like' : 'dislike';
    return await reaction.save();
  }

  updateReactionsCount(chapter, likesIncrement, dislikesIncrement = 0) {
    this.likes += likesIncrement;
    this.dislikes += dislikesIncrement;
  }

  updateUserReaction(liked = null) {
    this.hasDisliked = liked == null ? false : liked === false;
    this.hasLiked = liked == null ? false : liked === true;
  }
}
