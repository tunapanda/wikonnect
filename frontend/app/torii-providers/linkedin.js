import LinkedInOauth2 from 'torii/providers/linked-in-oauth2';

export default class LinkedInToriiProvider extends LinkedInOauth2 {
  fetch(data) {
    return data;
  }
}
