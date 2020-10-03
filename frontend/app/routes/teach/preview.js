import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachPreviewRoute extends Route {

  @inject
  me

  @inject router;

  @inject session;
  @tracked token = this.session.data.authenticated.token


  async model(params) {


    let p = params;
    console.log(p)
    console.log(this.router)
    console.log("this")
    const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach/' + params.id, {
      // const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach/' + params.chapter_id, {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.token,
      }),

    });

    const chapters = await response.json();
    console.log(chapters.chapter[0])
    return chapters.chapter[0];


  }
}
