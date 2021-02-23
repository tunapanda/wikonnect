describe('User can create chapter', () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/teach')
  });
  
  it('should display form', () => {
    // cy.intercept(/api\/v1\/chapters\/.*\/upload/).as('h5pUpload');
    const chapter = {name: 'test', description: 'test description'}

    cy.get('a.btn.bg-primary').click();
    cy.get('#create-chapter-form input.form-control')
      .type(chapter.name);
    cy.get('#create-chapter-form textarea.form-control')
    .type(chapter.description);
    cy.get('#create-chapter-form button[type="submit"]')
      .click();

    // cy.get('input[type="file"]').attachFile('test.h5p');

    // cy.wait('@h5pUpload');
    
    cy.get('button.btn.btn-warning').click();
    cy.get('button.btn.btn-warning').click();
    cy.get('button.btn.btn-warning').click();
  
    cy.get('input.form-control.bg-light')
      .should('have.value', chapter.name);

    cy.get('textarea.form-control.bg-light')
      .should('have.value', chapter.description);
  });
});