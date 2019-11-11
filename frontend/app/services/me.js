import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import RSVP from 'rsvp';


export default class MeService extends Service {
    @service
    session;

    @service
    store;

    async load() {
      const authenticator = getOwner(this).lookup('authenticator:jwt');
      const session = this.session.data.authenticated;

      let tokenData;
      if (session && session.token) {
        tokenData = authenticator.getTokenData(session.token);
        try {
          const user = await this.store.findRecord('user', tokenData.data.id);
          this.set('user', user);
        } catch (e) {
          return this.session.invalidate();
        }
      }
      return RSVP.resolve();
    }

    @alias('session.isAuthenticated')
    isAuthenticated;

    register(fields) {
      let user = this.store.createRecord('user', fields);

      return user.save();
    }

    authenticate(username, password) {
      let credentials = { username, password };
      return this.session.authenticate('authenticator:jwt', credentials).then(() => {
        return this.load();
      });
    }

    logout() {
      return this.session.invalidate();
    }
}
