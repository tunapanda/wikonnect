import Route from '@ember/routing/route';
import { inject } from '@ember/service';
//import settings from '../config/settings';

export default class ApplicationRoute extends Route {

  @inject
  session;

  @inject
  me;

  queryParams = { campaign_id: '', points: '', enduser_id: '', partner_id: '' };

  model(params) {




    let mojaLocalStorage = {
      partner_id: params.partner_id,
      enduser_id: params.enduser_id,
      campaign_id: params.campaign_id,
      points: params.points
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
