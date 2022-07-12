import TokenAuthenticator from 'ember-simple-auth-token/authenticators/jwt';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';

export default class PreAuthAuthenticator extends TokenAuthenticator {
  @service store;

  authenticate(data) {
    const adapter = this.store.adapterFor('application');

    return adapter.ajax(`/${adapter.urlPrefix()}/auth/token`, 'POST', { data });
  }
}
