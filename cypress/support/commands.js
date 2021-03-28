import "cypress-file-upload";

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


Cypress.Commands.add('chapters', (queryParams = {}) => {
    const qs = Object.keys(queryParams).reduce((acc, key) => {
        acc += `${key}=${queryParams[key]}&`;
        return acc;
    }, '')

    let headers = {'Accept': `application/json`}

    // check if user is authenticated
    const session = window.localStorage.getItem('ember_simple_auth-session');
    if (session) {
        const parsed = JSON.parse(session);
        if (parsed.authenticated && parsed.authenticated.token) {
            headers = {...headers, 'Authorization': `Bearer ${parsed.authenticated.token}`}
        }
    }

    return cy.request({
        method: 'GET',
        url: `/api/v1/chapters?${qs}`,
        headers: headers
    })
      .its('body')
      .then(res => {
        this.token = res.token;
        cy.request({
          method: 'GET',
          url: '/api/v1/chapters',
          headers: {
            'Authorization': `Bearer ${res.token}`
          }
        })
          .its('body.chapters')
      .then((chapters) => {
        chapters.filter(function (item) {
          return item.authenticatedUser === 'like';
        })
      })
      });
  });
        .its('body.chapter')
        .then((chapters) => chapters);
});

Cypress.Commands.add('comments', (queryParams = {}) => {
    const qs = Object.keys(queryParams).reduce((acc, key) => {
        acc += `${key}=${queryParams[key]}&`;
        return acc;
    }, '')

    let headers = {'Accept': `application/json`}

    // check if user is authenticated
    const session = window.localStorage.getItem('ember_simple_auth-session');
    if (session) {
        const parsed = JSON.parse(session);
        if (parsed.authenticated && parsed.authenticated.token) {
            headers = {...headers, 'Authorization': `Bearer ${parsed.authenticated.token}`}
        }
    }

    return cy.request({
        method: 'GET',
        url: `/api/v1/comments?${qs}`,
        headers: headers
    })
        .its('body.comment')
        .then((chapters) => chapters);
});