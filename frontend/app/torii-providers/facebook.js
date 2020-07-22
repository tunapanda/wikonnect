// import { computed } from '@ember/object';
import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';

export default class FacebookToriiProvider extends FacebookOauth2Provider {
  redirectUri = [ window.location.protocol, '//', window.location.host, '/torii/redirect.html' ].join('');

  fetch(data) {
    return data;
  }
}