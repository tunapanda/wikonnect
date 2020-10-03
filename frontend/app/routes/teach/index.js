import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TeachIndexRoute extends Route {
  @service session;
  @tracked token = this.session.data.authenticated.token

  @service me
  async model() {
    //   const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach');
    //const response = await fetch('/chapters/teach');


    console.log(this.token)
    const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach', {
      method: 'get',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.token,
      }),

    });

    const chapters = await response.json();

    return chapters;


  }
}
