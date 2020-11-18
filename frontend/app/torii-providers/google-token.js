/* eslint-disable */
import { configurable } from 'torii/configuration';
import Oauth2Bearer from 'torii/providers/oauth2-bearer';

let GoogleToken = Oauth2Bearer.extend({

  name: 'google-token',
  baseUrl: 'https://accounts.google.com/o/oauth2/auth',

  // additional params that this provider requires
  requiredUrlParams: ["state"],
  optionalUrlParams: ['scope', 'request_visible_actions', 'access_type'],

  requestVisibleActions: configurable('requestVisibleActions', ''),

  accessType: configurable('accessType', ''),

  responseParams: ['token'],

  scope: configurable('scope', 'profile'),

  state: configurable('state', 'STATE'),

  redirectUri: configurable('redirectUri',
    'http://localhost:4200/login'),

  open: function () {
    let name = this.get('name'),
      url = this.buildUrl(),
      redirectUri = this.get('redirectUri'),
      responseParams = this.get('responseParams');

    let client_id = this.get('client_id');

    return this.get('popup').open(url, responseParams).then(function (authData) {
      let missingResponseParams = [];

      responseParams.forEach(function (param) {
        if (authData[param] === undefined) {
          missingResponseParams.push(param);
        }
      });

      if (missingResponseParams.length) {
        throw "The response from the provider is missing " +
                "these required response params: " + responseParams.join(', ');
      }
      //   let personFields = 'names,emailAddresses';

      //   return fetch(`https://people.googleapis.com/v1/people/me?personFields=${personFields}&access_token=${authData.token}`)
      //     .then(response => response.json())
      //     .then(data => {
      //       console.log(data.names[0].displayName);
      //     });
      //   return fetch('http://localhost:3000/api/v1/users/token', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       'grant_type': authData.provider,
      //       'auth_code': authData.token
      //     })
      //   })
      //     .then(response => response.json())
      //     .then(data => {
      //       console.log('google token ciustom');
      //       console.log(data);
      //       return data;
      //     });
      let data = {
        'provider': authData.provider,
        'authorizationCode': authData.token
      };
      return data;
    });
  }
});

export default GoogleToken;