import RESTAdapter from 'ember-data/adapters/rest';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default class ApplicationEmberObject extends RESTAdapter.extend(TokenAuthorizerMixin) {
    namespace = 'api/v1'

}