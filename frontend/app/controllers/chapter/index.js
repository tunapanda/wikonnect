import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';


export default class ChapterIndexController extends Controller {

  @inject notify;



  @inject
  me

  @inject
  XapiRecord;

  @inject
  notify;

  flaggingModal = false
  ratingModal = false
  @tracked enabled = false

  @action
  ratingSubmit(val) {
    if (!this.enabled) {
      this.notify.info('Submitted your ' + val + ' star rating');
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
  toggleApproval(chapter_id, a) {
    if (a == "true") {
      this.store.findRecord('chapter', chapter_id).then(function (chap) {
        // ...after the record has loaded

        chap.set('approved', false);
        chap.set('contentType', "false");
        chap.save();
      });
    } else {
      this.store.findRecord('chapter', chapter_id).then(function (chap) {
        // ...after the record has loaded
        chap.set('approved', true);
        chap.set('contentType', "false");

        chap.save();

      });

    }
  }

  @action
  async dataLoad() {
    this.notify.info('chapter completed');
    let chapter_id = this.get('model').id;

    window.H5P.externalDispatcher.on('xAPI', function (event) {
      console.log('INITIAL STATEMENT ON externalDispatcher');
      if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
        let body = {
          achievement: {
            description: 'not set',
            targetStatus: 'completed',
            target: chapter_id
          }
        };
        console.log(event.getScore());
        console.log(event.getMaxScore());
        console.log(body);
      }
    });
  }
}