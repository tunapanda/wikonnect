import RESTAdapter from 'ember-data/adapters/rest';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default class ApplicationEmberObject extends RESTAdapter.extend(TokenAuthorizerMixin) {
  namespace = 'api/v1'

  ajaxOptions(...args) {
    const hash = super.ajaxOptions(...args);

    let token = this.get('session.data.authenticated.token');
    let mojaLocalStorage = {
      partner_id: window.localStorage.getItem('partner_id'),
      enduser_id: window.localStorage.getItem('enduser_id'),
      campaign_id: window.localStorage.getItem('campaign_id'),
      points: window.localStorage.getItem('points')
    }

    hash.headers['Authorization'] = `Bearer ${token}`;
    hash.headers['MojaHeader'] = `${mojaLocalStorage}`
    return hash;
  }
}