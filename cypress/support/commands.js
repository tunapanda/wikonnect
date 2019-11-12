Cypress.Commands.add('login', function () {
  cy.fixture('user').then(user => {
    cy.request({
      method: 'POST',
      url: '/api/v1/auth',
      body: {
        username: user.username,
        password: user.password
      }
    })
      .its('body')
      .then(res => {
        this.token = res.token;
        window.localStorage.setItem('ember_simple_auth-session', JSON.stringify({
          "authenticated": {
            "authenticator": "authenticator:jwt",
            "token": res.token,
            "exp": Math.floor(new Date().getTime() / 1000) + 1000 * 60 * 60,
            "tokenData": {
              "id": user.id,
              "iat": Math.floor(new Date().getTime() / 1000),
              "exp": Math.floor(new Date().getTime() / 1000) + 1000 * 60 * 60
            }
          }
        }));
      });
  });
});