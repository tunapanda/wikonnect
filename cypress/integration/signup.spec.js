import { cyan } from "colorette";

describe('Sign Up Page', function () {
  it('should register a new user', function () {
    cy.visit('/signup');

    cy.get('.signup-username input').type('signup_test');
    cy.get('.signup-email input').type('signup_test@example.com');
    cy.get('.signup-password input').type('password1234');
    cy.get('.signup-confirm-password input').type('password1234');

    cy.get('.signup-submit').click();

    cy.location('pathname').should('eq', '/');
  });

  it('should validate', function () {
    cy.visit('/signup');

    cy.get('.signup-submit').click();

    cy.get('.signup-username .invalid-feedback').should('have.text', 'Username can\'t be blank');
    cy.get('.signup-email .invalid-feedback').should('have.text', 'Email must be a valid email address');
    cy.get('.signup-password .invalid-feedback').should('have.text', 'Password can\'t be blank');

    cy.get('.signup-password input').type('password1234');

    cy.get('.signup-submit').click();

    cy.get('.signup-confirm-password .invalid-feedback').should('have.text', 'Password confirmation doesn\'t match password');
  });
});