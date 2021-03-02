import RESTAdapter from '@ember-data/adapter/rest';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default class ApplicationEmberObject extends RESTAdapter.extend(TokenAuthorizerMixin) {
  namespace = 'api/v1'

  ajaxOptions(...args) {
    const hash = super.ajaxOptions(...args);

    let token = this.get('session.data.authenticated.token');

    hash.headers['Authorization'] = `Bearer ${token}`;
    hash.headers['mojaHeader'] = window.localStorage.getItem('moja_campaign');
    hash.headers['achievement'] = window.localStorage.getItem('achievement');

    return hash;
  }
}