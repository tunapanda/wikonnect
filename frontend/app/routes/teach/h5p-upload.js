import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TeachH5pUploadRoute extends Route {

  @inject me;

  model(params) {

    return this.store.findRecord('chapter', params.id);



  }


  setupController(controller, model) {
    // Call _super for default behavior
    super.setupController(controller, model);
    // Implement your custom setup after
    controller.set('chapter_id', this.get('chapter_id'));
  }
}
