import Controller from '@ember/controller';

export default class TeachController extends Controller {
  get numOfDrafts() {
    return this.model.drafts.length;
  }

  get numOfPublished() {
    return this.model.published.length;
  }
}
