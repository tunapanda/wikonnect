import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

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
  @tracked theRating;
  @tracked remark;

  @action
  async ratingComment() {
    // console.log(this.remark);
    // let chap = await this.store.findRecord('rating', this.theRating);
    let theComment = this.remark;

    this.store.findRecord('rating', this.theRating).then(function (r) {

      r.comment = theComment;

      r.save(); // => PATCH to '/posts/1'
    });




  }


  @action
  async ratingSubmit(val) {



    if (!this.enabled) {
      let slug = await this.target.currentRoute.params.chapter_slug;
      let chap = await this.store.findRecord('chapter', slug);

      console.log("slug " + slug);
      console.log("ssuser : " + this.me.user.id);

      let rating = await this.store.createRecord('rating', {
        rating: val,
        comment: "N/A",
        user: this.me.get('user'),
        chapter: chap,
      });
      console.log("b4 rating");
      console.log(rating);
      await rating.save();
      console.log("rating");
      console.log(rating);
      console.log(rating.id);

      this.theRating = rating.id;

      this.rates = val;
      // this.notify.info('Submitted your ' + val + ' star rating');
      this.notify.info('Submitted your ' + val + ' star rating ');
      this.toggleProperty('ratingModal');


      this.enabled = true;
    }
  }


  @action
  reportSubmit() {
    console.log("lol");
  }

  @computed('model.rating')
  get averageRating() {
    // let slug = this.target.currentRoute.params.chapter_slug;
    let mdl = this.get("model");

    // let rated = this.store.query('rating', { "chapterId": slug });
    // let total = 0;
    // rated.forEach(element => {
    //   console.log(element.rating)
    //   total += element.rating;
    // });

    // console.log(mdl.name)
    // console.log(mdl.rating)

    // this.average = total / rated.get("length")
    return mdl;
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
  changer(val) {
    // console.log(val)
    this.remark = val;
  }
  get ratingModel() {
    let slug = this.target.currentRoute.params.chapter_slug;

    return this.store.query('rating', { "chapterId": slug })[0];
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


  @computed
  get remarks() {
    let slug = this.target.currentRoute.params.chapter_slug;

    let ratings = this.store.query('rating', { "chapterId": slug });
    return ratings;
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
