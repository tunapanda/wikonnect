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
  queryParams = ['callbackUrl', 'ref'];



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
    let slug = this.target.currentRoute.params.chapter_slug;

    let chap = this.store.peekRecord('chapter', slug);
    model.setProperties({
      chapter: chap,
    });
    await model.save();
  }

  @action
  deleteChapter(chapter_id) {
    let chapter = this.store.peekRecord('chapter', chapter_id);
    chapter.destroyRecord();
    this.router.transitionTo('manage');
  }

  @action
  async toggleApproval(chapterId, choice) {
    try {
      let chapter = this.store.peekRecord('chapter', chapterId);
      chapter.approved = choice;
      await chapter.save();
      this.notify.alert('Chapter approval status updated successfully');
    } catch (e) {
      this.notify.alert('Could not update chapter approval status');
    }
  }

  @action
  async dataLoad() {
    let chapter_id = await this.target.currentRoute.params.chapter_slug;
    let score;
    // eslint-disable-next-line no-undef
    H5P.externalDispatcher.on('xAPI', function (event) {
      console.log(event);
      if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
        score = event.data.statement.result.duration;
      }
    });
    console.log(score, chapter_id);
    // if (score != 'undefined') {
    //   let achievement = await this.store.createRecord('achievement', {
    //     description: 'completed' + chapter_id,
    //     targetStatus: 'completed',
    //     target: chapter_id,
    //   });

    //   // if user completes chapters create record
    //   let counter = await this.store.createRecord('counter', {
    //     counter: 1,
    //     chapterId: chapter_id,
    //     trigger: 'chapterCompletion',
    //   });

    //   await achievement.save();
    //   await counter.save();
    // }
  }

  @action
  async counterTimer() {
    let chapter_id = await this.target.currentRoute.params.chapter_slug;
    // record every page view
    // let counter = await this.store.createRecord('counter', {
    //   counter: 1,
    //   chapterId: chapter_id,
    //   trigger: 'pageLanding',
    // });
    // await counter.save();

    // After 10 secs record page view
    // await this.store.createRecord('counter', {
    //   counter: 1,
    //   chapterId: chapter_id,
    //   trigger: 'timerDelay',
    // });

    setTimeout(function () {
      let data = {
        counter: 1,
        chapterId: chapter_id,
        trigger: 'timerDelay',
      };
      alert(data.counter, data.trigger, data.chapterId);
    }, 100);
  }
}
