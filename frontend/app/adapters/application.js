import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  namespace = 'api/v1';
  get headers() {
    return {
      Authorization: `Bearer ${this.session?.data?.authenticated?.token}`,
    };
  }
}
