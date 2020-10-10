import Route from '@ember/routing/route';
import { inject } from '@ember/service';

export default class ApplicationRoute extends Route {

  @inject
  session;

  @inject
  me;

  queryParams = { campaign_id: '', points: '', enduser_id: '', partner_id: '' };

  model(params) {
    window.localStorage.setItem('campaign_id', params.campaign_id);
    window.localStorage.setItem('points', params.points);
    window.localStorage.setItem('enduser_id', params.enduser_id);
    window.localStorage.setItem('partner_id', params.partner_id);
  }

  beforeModel() {
    return this._loadMe();
  }

  _loadMe() {
    return this.me.load();
  }
}
