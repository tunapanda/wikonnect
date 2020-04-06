describe('Authenticated user Profile Page', function () {


  it('should flow through authed user learning path', function () {

    cy.visit('/login');

    cy.get('#username input').type('user1');
    cy.get('#password input').type('wikonnect');
    cy.get('.submit').click();
    cy.wait(3000);
    cy.visit('/profile');


    cy.contains("user1")


  });
}); 