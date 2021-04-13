import Service, { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { tracked } from '@glimmer/tracking';

export default class MeService extends Service {
  @service session;
  @service store;
  @tracked user;

  get isAuthenticated() {
    return this.session.isAuthenticated;
  }

  async load() {
    const authenticator = getOwner(this).lookup('authenticator:jwt');
    const session = this.session.data.authenticated;

    let tokenData;
    if (session && session.token) {
      tokenData = authenticator.getTokenData(session.token);
      try {
        this.user = await this.store.findRecord('user', tokenData.data.id);
      } catch (e) {
        return this.session.invalidate();
      }
    }
    return Promise.resolve();
  }

  async register(fields) {
    let user = this.store.createRecord('user', fields);

    return await user.save();
  }

  registerWithOauth2(fields) {
    let oauth2 = this.store.createRecord('oauth2', fields);
    return oauth2.save();
  }

  authenticate(username, password) {
    let credentials = { username, password };
    return this.session
      .authenticate('authenticator:jwt', credentials)
      .then(() => {
        return this.load();
      });
  }

  logout() {
    return this.session.invalidate();
  }

  get name() {
    if (!this.user.metadata) {
      return this.user.username;
    }
    if (this.user.metadata.firstName && this.user.metadata.lastName) {
      return `${this.user.metadata.firstName} ${this.user.metadata.lastName}`;
    } else if (this.user.metadata.firstName && !this.user.metadata.lastName) {
      return this.user.metadata.firstName;
    } else if (!this.user.metadata.firstName && this.user.metadata.lastName) {
      return this.user.metadata.lastName;
    } else {
      return this.user.username;
    }
  }
}
