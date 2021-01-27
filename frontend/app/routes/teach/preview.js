import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachPreviewRoute extends Route {

  @inject
  me
  @tracked token = this.session.data.authenticated.token




  model(params) {


    return this.store.findRecord('chapter', params.id);



  }
}
