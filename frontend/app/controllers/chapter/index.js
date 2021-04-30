import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ChapterIndexController extends Controller {
  @service store;
  @service router;
  @service me;
  @service notify;

  @tracked enabled = false;
  @tracked rates = 0;
  @tracked copied = false;
  @tracked flaggingModal = false;
  @tracked ratingModal = false;
  @tracked score;
  @tracked showRRPopup = false;
  @tracked userChapterReaction;
  @tracked showPositiveRFPopup = false;
  @tracked showNegativeRFPopup = false;
  @tracked showRRFeedbackModal = false;

  queryParams = ['callbackUrl', 'ref'];

  get comments() {
    let chapterId = this.model.id;

    return this.store
      .peekAll('comment')
      .filter(
        (comment) =>
          comment.parentId === 'false' && comment.chapterId === chapterId
      );
  }

  get replies() {
    let chapterId = this.model.id;

    return this.store
      .peekAll('comment')
      .filter(
        (comment) =>
          comment.parentId !== 'false' && comment.chapterId === chapterId
      );
  }

  get embedCode() {
    let baseURL = window.location.host;
    if (this.callbackUrl) {
      return (
        `<iframe width="600" height="450"  src="http://${baseURL}/embed/${this.model.id}?` +
        `callbackUrl=${this.callbackUrl}" frameBorder="0" scrolling="no"></iframe>`
      );
    } else {
      return (
        `<iframe width="600" height="450" src="http://${baseURL}/embed/${this.model.id}" ` +
        'frameBorder="0" scrolling="no"></iframe>'
      );
    }
  }

  @action
  async ratingSubmit(val) {
    if (!this.enabled) {
      let slug = await this.target.currentRoute.params.chapter_slug;
      let chap = this.store.peekRecord('chapter', slug);

      let rating = await this.store.createRecord('rating', {
        rating: val,
        user: this.me.user,
        chapter: chap,
      });
      await rating.save();

      this.rates = val;
      // this.notify.info('Submitted your ' + val + ' star rating');
      this.notify.info('Submitted your ' + val + ' star rating ' + val);
      this.ratingModal = !this.ratingModal;

      this.enabled = true;
    }
  }

  @action
  onSuccess() {
    this.copied = true;
  }

  @action
  reportSubmit() {}

  @action
  toggleFlaggingModal() {
    this.flaggingModal = !this.flaggingModal;
  }

  @action
  toggleRatingModal() {
    this.ratingModal = !this.ratingModal;
  }

  get flagModel() {
    return this.store.createRecord('flag', {
      creator: this.me.get('user'),
    });
  }

  @action
  async saveFlag(model) {
    let chapterId = this.model.id;

    let chap = this.store.peekRecord('chapter', chapterId);
    model.setProperties({
      chapter: chap,
    });
    await model.save();
  }

  @action
  async deleteChapter(chapter_id) {
    let chapter = this.store.peekRecord('chapter', chapter_id);
    await chapter.destroyRecord();
    this.router.transitionTo('manage');
  }

  @action
  async toggleApproval(chapterId, choice) {
    let chapter = this.store.peekRecord('chapter', chapterId);
    try {
      chapter.approved = choice;
      await chapter.save();
      this.notify.success('Chapter approval status updated successfully');
    } catch (e) {
      chapter.approved = !choice;
      this.notify.alert('Could not update chapter approval status');
    }
  }

  @action
  async onH5PPlayerXAPIEvent(event) {
    if (!event || !event.getScore) {
      return;
    }
    let chapterId = this.model.id;
    if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
      this.score = event.getMaxScore();
    }

    if (this.score !== undefined) {
      if (this.me.isAuthenticated) {
        let achievement = await this.store.createRecord('achievement', {
          description: 'completed' + chapterId,
          targetStatus: 'completed',
          target: chapterId,
        });
        await achievement.save();
      }

      // if user completes chapters create record
      let counter = await this.store.createRecord('counter', {
        counter: 1,
        chapterId: chapterId,
        trigger: 'chapterCompletion',
      });
      await counter.save();
    }
  }

  @action
  async counterTimer() {
    const sleep = (m) => new Promise((r) => setTimeout(r, m));
    let chapter_id = await this.target.currentRoute.params.chapter_slug;
    // record every page view
    let pageLanding = await this.store.createRecord('counter', {
      counter: 1,
      chapterId: chapter_id,
      trigger: 'pageLanding',
    });
    await pageLanding.save();

    // After 10 secs record page view
    await (async () => {
      await sleep(6000);
      let data = {
        counter: 1,
        chapterId: chapter_id,
        trigger: 'timerDelay',
      };
      let timerDelay = await this.store.createRecord('counter', data);
      await timerDelay.save();
    })();
  }

  @action
  async onChapterReactionChange(previousReaction, currentReaction) {
    if (previousReaction !== undefined || currentReaction === undefined) {
      // delete any previous rating if reaction has been altered
      await this.deleteUserRatingReview();
    }
    if (currentReaction) {
      this.userChapterReaction = currentReaction;
      if (currentReaction === 'like') {
        this.showPositiveRFPopup = true;
        this.showNegativeRFPopup = false;

        return 1;
      }

      this.showPositiveRFPopup = false;
      this.showNegativeRFPopup = true;
    }
  }

  @action
  closePositiveRFPopup() {
    this.showPositiveRFPopup = false;
  }

  @action
  closeNegativeRFPopup() {
    this.showNegativeRFPopup = false;
  }

  @action
  hideRRModal() {
    this.showRRPopup = false;
  }
  @action
  hideRRFeedbackModal() {
    this.showRRFeedbackModal = false;
  }

  @action
  openRRPopup() {
    this.showPositiveRFPopup = false;
    this.showNegativeRFPopup = false;
    this.showRRPopup = true;
  }

  @action
  async submitReviewRatings(review, ratings) {
    const record = this.store.createRecord('rating', {
      chapter: this.model,
      reaction: this.userChapterReaction,
      metadata: ratings,
      review: { metadata: review },
    });
    try {
      await record.save();
      this.showRRPopup = false;
      this.showRRFeedbackModal = true;
    } catch (e) {
      this.notify.error('Error encountered during submission.');
    }
  }
  async deleteUserRatingReview() {
    const ratings = this.store.peekAll('rating');
    if (ratings.length > 0) {
      await ratings.firstObject.destroyRecord();
    }
  }
}
