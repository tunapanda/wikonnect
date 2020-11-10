import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';


export default class ChapterIndexController extends Controller {

  @inject notify;

  @inject
  store;

  @inject
  router;

  @inject
  me


  @inject
  notify;

  flaggingModal = false
  ratingModal = false
  @tracked enabled = false
  @tracked rates = 0;

  @action
  async ratingSubmit(val) {
    if (!this.enabled) {
      let slug = await this.target.currentRoute.params.chapter_slug;
      let chap = await this.store.findRecord('chapter', slug);

      console.log('slug ' + slug);
      console.log('ssuser : ' + this.me.user.id);

      let rating = await this.store.createRecord('rating', {
        rating: val,
        user: this.me.get('user'),
        chapter: chap,
      });
      await rating.save();

      this.rates = val;
      // this.notify.info('Submitted your ' + val + ' star rating');
      this.notify.info('Submitted your ' + val + ' star rating ' + val);
      this.toggleProperty('ratingModal');


      this.enabled = true;
    }
  }


  @action
  reportSubmit() {

  }

  @action
  toggleFlaggingModal() {
    this.toggleProperty('flaggingModal');
  }


  @action
  toggleRatingModal() {
    this.toggleProperty('ratingModal');
  }
  get flagModel() {
    return this.store.createRecord('flag', {
      creator: this.me.get('user')
    });
  }

  @action
  async saveFlag(model) {


    let slug = this.target.currentRoute.params.chapter_slug;

    // console.log(this.params['chapter_slug'])
    let chap = await this.store.findRecord('chapter', slug);
    model.setProperties({
      chapter: chap,
    });
    model.save();

  }

  @action
  deleteChapter(chapter_id) {
    let chapter = this.store.peekRecord('chapter', chapter_id);
    chapter.destroyRecord();
    this.router.transitionTo('manage');

  }


  @action
  toggleApproval(chapter_id, a) {
    if (a == 'true') {
      this.store.findRecord('chapter', chapter_id).then(function (chap) {
        // ...after the record has loaded

        chap.set('approved', false);
        chap.set('contentType', 'false');
        chap.save();
      });
    } else {
      this.store.findRecord('chapter', chapter_id).then(function (chap) {
        // ...after the record has loaded
        chap.set('approved', true);
        chap.set('contentType', 'false');

        chap.save();

      });

    }
  }

  @action
  async dataLoad(el) {
    console.log(el);
    // this.notify.info('chapter completed');
    let chapter_id = await this.target.currentRoute.params.chapter_slug;
    let score;
    window.H5P.externalDispatcher.on('xAPI', function (event) {
      if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
        console.log(event.data.statement.result.duration);
        score = event.data.statement.result.duration;
      }
    });
    console.log(score);

    if (score != 'undefined') {
      let achievement = await this.store.createRecord('achievement', {
        description: 'completed' + chapter_id,
        targetStatus: 'completed',
        target: chapter_id
      });
      await achievement.save();
    }
  }
}
