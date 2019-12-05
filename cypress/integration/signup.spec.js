import { cyan } from "colorette";

describe('Sign Up Page', function () {
  it('should register a new user', function () {
    cy.visit('/signup');

    cy.get('#username input').type('signup_test');
    cy.get('#email input').type('signup_test@example.com');
    cy.get('#password input').type('password1234');
    cy.get('#confirm-password input').type('password1234');

    cy.get('.submit').click();

    cy.location('pathname').should('eq', '/');
  });

  it('should validate', function () {
    cy.visit('/signup');

    cy.get('.submit').click();

    cy.get('#username .invalid-feedback').should('have.text', 'Username can\'t be blank');
    cy.get('#email .invalid-feedback').should('have.text', 'Email must be a valid email address');
    cy.get('#password .invalid-feedback').should('have.text', 'Password can\'t be blank');

    cy.get('#password input').type('password1234');

    cy.get('.submit').click();

    cy.get('#confirm-password .invalid-feedback').should('have.text', 'Password confirmation doesn\'t match password');
  });
});