describe('Authenticated user learning path', function () {


  it('should flow through authed user learning path', function () {

    cy.visit('/login');

    cy.get('#username input').type('user1');
    cy.get('#password input').type('wikonnect');
    cy.get('.submit').click();
    cy.wait(3000);
    cy.visit('/courses');
    cy.contains('A Course 1').click({ force: true })
    cy.location('pathname').should('eq', '/course/a-course-1');
    cy.contains("A Module").click({ force: true })
    cy.location('pathname').should('eq', '/module/a-module-1');
    cy.contains("A Lesson").click({ force: true })
    cy.location('pathname').should('eq', '/lesson/a-lesson');
    cy.contains("A Chapter").click({ force: true })
    cy.location('pathname').should('eq', '/chapter/chapter1');

    cy.contains("A Chapter")


  });
}); 