describe('Authenticated user learning path', function () {


  it('should flow through auth an auth required learning path', function () {

    cy.visit('/login');

    cy.get('#username input').type('user1');
    cy.get('#password input').type('wikonnect');
    cy.get('.submit').click();
    cy.wait(3000);
    cy.visit('/home');
    cy.contains('Chapter 1').click({ force: true })
    cy.location('pathname').should('eq', '/chapter/chapter1');

    //cy.contains("A Chapter")


  });
});
