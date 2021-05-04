describe('Navigation Menu Chapters Search ', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have navigation chapters search form', () => {
    cy.get('.main-header.navbar #myDropdown')
      .should('be.visible');
    cy.get('.main-header.navbar #myDropdown input')
      .should('be.visible');

  });

  it('Should search chapters by title', () => {
    cy.chapters({ approved: true }).then((items) => {
      cy.get('.main-header.navbar #myDropdown input')
        .type(items[0].name)
        .get('#myDropdown .dropdown-item .chapter-title')
        .contains(items[0].name)
        .click()
        .url()
        .should('include', `/chapter/${items[0].id}`);
    });
  });
})