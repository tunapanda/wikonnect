import Component from '@glimmer/component';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';
import {tracked} from '@glimmer/tracking';

export default class ReactionChapterReactionComponent extends Component {

  @service me;
  @service store;

  @tracked
  likes = this.args.chapter.reaction.likes || 0;
  @tracked
  dislikes = this.args.chapter.reaction.dislikes || 0;

  get chapter() {
    return this.args.chapter;
  }

  get currentUserReaction() {
    return this.store.peekAll('reaction')
      .find((r) => (r.user.get('id') === this.me.user.id && r.chapter.get('id') === this.args.chapter.id));
  }

  get hasLiked() {
    if (!this.me.isAuthenticated) {
      return false;
    }
    const obj = this.currentUserReaction;
    if (!obj) {
      return false;
    }
    return obj.reaction === 'like';
  }

  get hasDisliked() {
    if (!this.me.isAuthenticated) {
      return false;
    }
    const obj = this.currentUserReaction;
    if (!obj) {
      return false;
    }
    return obj.reaction === 'dislike';
  }

  @action
  async userChapterReaction(chapter, liked = true) {
    if (!this.me.isAuthenticated || this.args.canReact === false) {
      return;
    }

    console.log(this.hasDisliked,this.hasDisliked);


    //if they have none, post
    if (!this.hasLiked && !this.hasDisliked) {
      return this.createUserChapterReaction(chapter, liked)
        .then(() => {

          this.updateChapterReactions(chapter, liked ? 1 : 0, liked ? 0 : 1);

        }).catch(() => {
        });
    }

    //if is the same, they have retracted it, delete/undo the reaction
    if ((this.hasLiked && liked === true) ||
      (this.hasDisliked && liked === false)) {
      return this.deleteUserChapterReaction(this.currentUserReaction)
        .then(() => {
          this.updateChapterReactions(chapter, liked ? -1 : 0, liked ? 0 : -1);
        }).catch(() => {

        });
    }

    // if they switch, update the reaction
    return this.updateUserChapterReaction(this.currentUserReaction, liked)
      .then(() => {
        this.updateChapterReactions(chapter, liked ? 1 : -1, liked ? -1 : 1);
      }).catch(() => {
      });

  }


  async createUserChapterReaction(chapter, liked) {
    const model = this.store.createRecord('reaction', {
      reaction: liked ? 'like' : 'dislike',
      chapter: chapter,
      user: this.me.user
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

  updateChapterReactions(chapter, likesIncrement, dislikesIncrement = 0) {
    console.log(likesIncrement, dislikesIncrement);
    this.likes += likesIncrement;
    this.dislikes += dislikesIncrement;
  }

}
