import { cyan } from "colorette";

describe('Login Page', function () {
  it('should login', function () {
    cy.visit('/login');

    cy.get('#username input').type('user1');
    cy.get('#password input').type('password1234');

    cy.get('.submit').click();

    cy.location('pathname').should('eq', '/');
  });

  it('should validate', function () {
    cy.visit('/login');

    cy.get('.submit').click();

    cy.get('#username .invalid-feedback').should('have.text', 'Username can\'t be blank');
    cy.get('#password .invalid-feedback').should('have.text', 'Password can\'t be blank');
  });
});