describe('Authenticated user learning path', function () {


  it('should flow through unauthenticated user learning path', function () {


    cy.visit('/home');
    cy.contains('Chapter 1').click({ force: true })
    cy.location('pathname').should('eq', '/chapter/chapter1');


    // cy.contains("A Chapter").click({ force: true })
    // cy.location('pathname').should('eq', '/chapter/chapter2');

    //cy.contains("A Chapter")
  });
});
