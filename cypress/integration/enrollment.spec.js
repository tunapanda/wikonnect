describe('Enrollments', function () {


  it('should enroll  user to course', function () {

    cy.visit('/login');

    cy.get('#username input').type('user2');
    cy.get('#password input').type('wikonnect');
    cy.get('.submit').click();
    cy.wait(3000);
    cy.visit('/courses');
    cy.contains('A Course 2').click({ force: true })
    cy.location('pathname').should('eq', '/course/a-course-2');



  });




}); 