## Social auth strategy

Uses exchangeCode from the social apps exchanging them for access token and getting user information
* GitHub
* Facebook
* Google


### Basic Usage
```js
import authStrategies = require('./index');
const exchangeCode = exchangeCode;

// Call the function while passing the provider and exchangeCode
await authStrategies[github](exchangeCode);
await authStrategies[facebook](exchangeCode);
await authStrategies[google](exchangeCode);

// Your implementation goes here
```

Auth strategy returns a custom user object for Wikonnect
```js
return {
    email: email,
    hash: password,
    username: username,
    firstName: firstName,
    lastName: lastName,
    metadata: {
      'profileComplete': 'false',
      'oneInviteComplete': 'false',
      'firstName': firstName,
      'lastName': lastName
    }
  };
```

Required env variable
```
FACEBOOK_CLIENT_SECRET=xxxxxxx
FACEBOOK_APP_ID=xxxxxxxxx
FACEBOOK_REDIRECT=xxxxxx

GITHUB_CLIENT_ID=xxxxxxx
GITHUB_REDIRECT_URI=xxxxxxx
GITHUB_ACCESS_TOKEN=xxxxxxxxxx
```