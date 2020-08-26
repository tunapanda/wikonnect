import Route from '@ember/routing/route';
// import { inject } from '@ember/service';
import { action } from '@ember/object';

export default class SurveyRoute extends Route {

  // @inject
  // me
  model(){
    this.store.findAll('survey')
  }
}
