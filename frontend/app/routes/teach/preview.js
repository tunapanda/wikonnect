import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachPreviewRoute extends Route {

  @inject
  me




  model(params) {


    return this.store.findRecord('chapter', params.id);


  }
}
