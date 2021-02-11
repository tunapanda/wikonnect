import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {action} from '@ember/object';

export default class HomeController extends Controller {
  @service
  me;


  get allTags() {
    // this.model
    let filtered = [];
    this.model.map(c => {
      console.log('ok');
      if (c.tags) {
        filtered.concat(c.tags);
      }
    });

    return ['filtered', 'ok'];
  }

  @action
  async userChapterReaction(chapter, liked = true) {
    if (!this.me.isAuthenticated) {
      return;
    }

    const previousReaction = this.previousUserChapterReaction(chapter.id);

    //if they have none, post
    if (!previousReaction) {
      return this.createUserChapterReaction(chapter, liked)
        .then(() => {
          this.updateChapterReactions(chapter, liked ? 1 : 0, liked ? 0 : 1);

        }).catch(() => {
        });
    }

    //if is the same, they have retracted it delete/undo the reaction
    if ((previousReaction.reaction === 'like' && liked === true) ||
      (previousReaction.reaction === 'dislike' && liked === false)) {
      return this.deleteUserChapterReaction(previousReaction).then(() => {
        this.updateChapterReactions(chapter, liked ? -1 : 0, liked ? 0 : -1);
      }).catch(() => {
      });
    }

    // if it negates, update the reaction
    return this.updateUserChapterReaction(previousReaction, liked)
      .then(() => {
        this.updateChapterReactions(chapter, liked ? 1 : -1, liked ? -1 : 1);
      }).catch(() => {
      });

  }


  previousUserChapterReaction(chapterId) {
    return this.store.peekAll('reaction').find((reaction) => reaction.chapter.get('id') === chapterId);
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
    chapter.likes += likesIncrement;
    chapter.dislikes += dislikesIncrement;
  }
}
