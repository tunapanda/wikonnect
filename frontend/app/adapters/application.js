import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;

  namespace = 'api/v1';
  headers = {
    Authorization: `Bearer ${this.session?.data?.authenticated?.token}`,
    mojaHeader: window.localStorage.getItem('moja_campaign'),
    achievement: window.localStorage.getItem('achievement')
  };
}
