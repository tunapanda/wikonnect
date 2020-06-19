import { cyan } from "colorette";

describe('Login Page', function () {
  it('should login', function () {
    cy.visit('/login');

    cy.get('#username input').type('user1');
    cy.get('#password input').type('wikonnect');

    cy.get('.submit').click();

    cy.location('pathname').should('eq', '/home');
  });

  it('should fail', function () {
    cy.visit('/login');

    cy.get('#username input').type('krujj');
    cy.get('#password input').type('wikonnect');

    cy.get('.submit').click();

    cy.location('pathname').should('not', '/home');
  });



  it('should validate', function () {
    cy.visit('/login');

    cy.get('.submit').click();

    cy.get('#username .invalid-feedback').should('have.text', 'Username can\'t be blank');
    cy.get('#password .invalid-feedback').should('have.text', 'Password can\'t be blank');
  });

  it('should reject username with special characters', function () {
    cy.visit('/login');

    cy.get('#username input').type('    ');
    cy.get('#password input').type('wikonnect');

    cy.get('.submit').click();

    cy.get('#username .invalid-feedback').should('have.text', 'No special characters allowed');
  });

  it('should reject username with special characters', function () {
    cy.visit('/login');

    cy.get('#username input').type('=-4$;;');
    cy.get('#password input').type('wikonnect');

    cy.get('.submit').click();

    cy.get('#username .invalid-feedback').should('have.text', 'No special characters allowed');
  });
});