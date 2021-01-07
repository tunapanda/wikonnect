import { inject as service } from '@ember/service';
import Torii from 'ember-simple-auth/authenticators/torii';


export default class ToriiAuthenticator extends Torii {
  @service torii;


  authenticate() {
    return super.authenticate(...arguments).then((data) => {

      return fetch(process.env.GOOGLE_REDIRECT + '/api/v1/users/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'grant_type': data.provider,
          'auth_code': data.authorizationCode
        })
      }).then(response => response.json());
    });
  }
}
