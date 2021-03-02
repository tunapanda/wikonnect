import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class EmbedController extends Controller {

  queryParams = ['callbackUrl', 'ref']
  @tracked showLoginModal = false;
  @tracked showRegistrationModal = false;
  @inject
  me

  /** TODO:
   *      Send progress webhook to 3rd party(consumer) endpoint
   *      Retry progress update if unsuccessful
   *      Documentation for 3rd party
  */


  get embedCode() {
    let mod = this.get('model');
    return `<iframe width="560" height="315" src="app.wikonnect.org/embed/${mod.id}" ></iframe>`;

  }

  @action
  login() {
    this.showLoginModal = false;
  }

  @action
  signup() {
    this.showRegistrationModal = false;
  }
  @action
  logout() {
    this.me.logout();

  }
  @action
  async dataLoad(el) {
    let score;
    console.log(this.callbackUrl);
    window.H5P.externalDispatcher.on('xAPI', function (event) {
      if (event.getScore() === event.getMaxScore() && event.getMaxScore() > 0) {
        score = event.data.statement.result.duration;
      }
      console.log(event);
    });
    // if (score != 'undefined') {
    //   let achievement = await this.store.createRecord('achievement', {
    //     description: 'completed' + chapter_id,
    //     targetStatus: 'completed',
    //     target: chapter_id
    //   });

    //   // if user completes chapters create record
    //   let counter = await this.store.createRecord('counter', {
    //     counter: 1,
    //     chapterId: chapter_id,
    //     trigger: 'chapterCompletion'
    //   });

    //   await achievement.save();
    //   await counter.save();
    // }
  }
}
