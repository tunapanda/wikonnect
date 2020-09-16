import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

import { inject } from '@ember/service';



export default class ChapterIndexController extends Controller {

  @inject notify;

  @service
  store;

  @inject
  me



  flaggingModal = false
  ratingModal = false
  @tracked enabled = false
  @tracked rates = 0;

  @action
  async ratingSubmit(val) {
    if (!this.enabled) {
      let slug = await this.target.currentRoute.params.chapter_slug;
      let chap = await this.store.findRecord('chapter', slug);

      console.log("slug " + slug);
      console.log("ssuser : " + this.me.user.id);

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
}
