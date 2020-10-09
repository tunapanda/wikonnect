import RESTAdapter from 'ember-data/adapters/rest';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default class ApplicationEmberObject extends RESTAdapter.extend(TokenAuthorizerMixin) {
  namespace = 'api/v1'

  ajaxOptions(...args) {
    const hash = super.ajaxOptions(...args);

    let token = this.get('session.data.authenticated.token');
    let User = window.localStorage.getItem('test');;
    hash.headers['Authorization'] = `Bearer ${token}`;
    hash.headers['moja'] = `${User}`;
    return hash;
  }
}