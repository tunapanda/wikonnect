import Controller from '@ember/controller';
import { action } from '@ember/object';

import { inject } from '@ember/service';



export default class ChapterIndexController extends Controller {




  @inject
  me



  flaggingModal = false
  ratingModal = false

  @action
  ratingSubmit() {

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


  // return await this.store.createRecord('achievement', {
  //   userId: "user1",
  //   name: "moses",
  //   slug: "moses",
  //   description: "moses",
  //   targetStatus: "moses",
  //   target: "moses"
  // });
  @action
  async dataLoad() {
    window.H5P.externalDispatcher.on('xAPI', function (event) {
      console.log('INITIAL STATEMENT ON externalDispatcher')
      // console.log(event.data.statement)
      // console.log(event.data.statement.result)
      if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
        console.log('do something useful here');
        console.log(event.getScore());
        console.log(event.getMaxScore());
        return this.store.createRecord('achievement', {
          id: 'achieve4',
          userId: 'user1',
          name: "moses",
          slug: "moses",
          description: "moses",
          targetStatus: "moses",
          target: "moses"
        });
      }
    })
  //   return this.store.createRecord('achievement', {
  //     id: 'achieve3',
  //     userId: 'user1',
  //     name: "moses",
  //     slug: "moses",
  //     description: "moses",
  //     targetStatus: "moses",
  //     target: "moses"
  //   });
  }
}