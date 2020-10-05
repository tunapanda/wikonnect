import Controller from '@ember/controller';
// import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject } from '@ember/service';

export default class TeachPreviewController extends Controller {

  @inject notify;
  @inject session;
  token = this.session.data.authenticated.token


  @action
  async publish(chapter_id, a) {
    console.log("ee");
    console.log(chapter_id);
    console.log(a);

    const response = await fetch('../../api/v1/chapters/' + chapter_id, {
      // const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach/' + params.chapter_id, {
      method: 'put',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.token,
      }),
      body: JSON.stringify({ chapter: { id: chapter_id, status: 'published' } })

    });

    console.log(response);

  }


  @action
  async unpublish(chapter_id, a) {
    console.log("ee");
    console.log(chapter_id);
    console.log(a);

    const response = await fetch('../../api/v1/chapters/' + chapter_id, {
      // const response = await fetch('https://app.wikonnect.org/api/v1/chapters/teach/' + params.chapter_id, {
      method: 'put',
      headers: new Headers({
        'Authorization': 'Bearer ' + this.token,
      }),
      body: JSON.stringify({ chapter: { id: chapter_id, status: 'draft', approved: "false" } })

    });

    console.log(response);

  }

  @inject
  me
}
