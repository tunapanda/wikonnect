import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';
import config from 'wikonnect/config/environment';

export default class ApplicationAdapter extends RESTAdapter {
  @service session;
  @service fastboot;

  namespace = 'api/v1';
  host = config.proxyUrl ? config.proxyUrl : config.appUrl;

  get headers() {
    let achievements = '';
    if (!this.fastboot.isFastBoot) {
      achievements = window.localStorage.getItem('achievements');
    }
    return {
      Authorization: `Bearer ${this.session?.data?.authenticated?.token}`,
      achievements,
    };
  }
}
