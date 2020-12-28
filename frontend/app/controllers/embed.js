import Controller from '@ember/controller';

export default class EmbedController extends Controller {

  queryParams = ['callbackUrl', 'ref']





  get embedCode() {
    let mod = this.get('model');
    return `<iframe width="560" height="315" src="app.wikonnect.org/embed/${mod.id}" ></iframe>`;

  }
}
