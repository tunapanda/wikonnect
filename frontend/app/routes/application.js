import Route from '@ember/routing/route';
import {inject as service} from '@ember/service';

export default class ApplicationRoute extends Route {

  @service session;
  @service me;

  queryParams = {campaign_id: '', points: '', enduser_id: '', partner_id: ''};

  model(params) {

    let mojaLocalStorage = {
      partner_id: params.campaign_id,
      enduser_id: params.points,
      campaign_id: params.enduser_id,
      points: params.partner_id
    };

    window.localStorage.setItem('moja_campaign', JSON.stringify(mojaLocalStorage));
  }

  beforeModel() {
    return this._loadMe();
  }

  _loadMe() {
    return this.me.load();
  }
}
