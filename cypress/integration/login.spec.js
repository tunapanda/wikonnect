import { cyan } from "colorette";

describe('Login Page', function () {
  it('should login', function () {
    cy.visit('/login');

    cy.get('.login-username input').type('user1');
    cy.get('.login-password input').type('password1234');

    cy.get('.login-submit').click();

    cy.location('pathname').should('eq', '/');
  });

  it('should validate', function () {
    cy.visit('/login');

    cy.get('.login-submit').click();

    cy.get('.login-username .invalid-feedback').should('have.text', 'Username can\'t be blank');
    cy.get('.login-password .invalid-feedback').should('have.text', 'Password can\'t be blank');
  });
});