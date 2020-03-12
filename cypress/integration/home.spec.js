describe('Home page test', function () {

  it('should show a warning if logged out', function () {
    cy.visit('/home');
    cy.contains("You do not have permission to view this page");
  });

  it('should show a propmt if logged out', function () {
    cy.visit('/home');
    cy.contains(" LOGIN or SIGNUP to keep track of your progress");
  });

  it('should not show a warning if logged in', function () {
    cy.visit('/login');
    cy.get('#username input').type('user1');
    cy.get('#password input').type('wikonnect');

    cy.get('.submit').click();

    cy.location('pathname').should('eq', '/home');

    cy.contains(" LOGIN or SIGNUP to keep track of your progress").should('not.exist');
  });


});