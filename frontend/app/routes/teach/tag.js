import Route from '@ember/routing/route';

export default class TeachTagRoute extends Route {



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
