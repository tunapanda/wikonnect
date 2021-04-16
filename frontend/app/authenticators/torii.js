import { inject as service } from '@ember/service';
import Torii from 'ember-simple-auth/authenticators/torii';

export default Torii.extend({
  torii: service(),
  me: service(),

  authenticate() {
    return this._super(...arguments).then((data) => {
      this.me
        .registerWithOauth2({
          code: data.authorizationCode,
          provider: data.provider,
        })
        .then((user) => {
          if (user.get('isNew')) {
            this.signupSuccess();
          } else {
            this.me
              .authenticate(user.get('username'), data.authorizationCode)
              .then(() => this.transitionTo('index'));
          }
        });
    });
  },
});
