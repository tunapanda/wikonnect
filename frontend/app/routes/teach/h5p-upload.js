import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class TeachH5pUploadRoute extends Route {

  @inject me;

  async model(params) {


    let p = params;
    console.log(p);
    console.log(this.router);
    console.log("this");
    const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach/' + params.id, {
      // const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach/' + params.chapter_id, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.token,
      }),

    });

    this.set('chapter_id', params.id);

    const chapters = await response.json();
    console.log(chapters.chapter[0]);

    return chapters.chapter[0];


  }


  setupController(controller, model) {
    // Call _super for default behavior
    super.setupController(controller, model);
    // Implement your custom setup after
    controller.set('chapter_id', this.get('chapter_id'));
  }
}
