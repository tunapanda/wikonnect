// import { computed } from '@ember/object';
import FacebookOauth2Provider from 'torii/providers/facebook-oauth2';

export default class FacebookToriiProvider extends FacebookOauth2Provider {
  fetch(data) {
    return data;
  }
}
