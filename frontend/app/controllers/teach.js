import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class TeachController extends Controller {
  
  @service me;
  statistics = {};

  get numOfDrafts() {
    return this.model.drafts.length;
  }

  get numOfPublished() {
    return this.model.published.length;
  }
}
