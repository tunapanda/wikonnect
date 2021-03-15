describe('Navigation Menu Chapters Search ', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('Should have navigation chapters search form', () => {
    cy.get('.main-header.navbar .search-form #search')
      .should('be.visible');
    cy.get('.main-header.navbar .search-form .search-button')
      .should('be.visible');

  });

  it('Should search chapters by title', () => {
    cy.chapters().then((items)=>{
    cy.get('.main-header.navbar .search-form #search')
      .type(items[0].name)
      .get('.main-header.navbar .search-form')
      .submit()
      .url()
      .should('include', `/search/${encodeURIComponent(items[0].name)}`)
      .get('#search-results-section .chapter-card .chapter-title')
      .contains(items[0].name);
    });
  });
})