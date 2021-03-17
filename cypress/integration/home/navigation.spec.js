describe('Learner Navigation Menu', () => {

  beforeEach(() => {
    cy.visit('/');
  });


  it('Should link to login page', () => {
    cy.get('.main-header.navbar a[href="/login"]')
      .should('be.visible');
  });

  it('Should link to signup page', () => {
    cy.get('.main-header.navbar a[href="/login"]')
      .should('be.visible');
  });

  it('Should link to about', () => {
    cy.get('.main-header.navbar a[href="/about"]')
      .should('be.visible');
  });

  it('Should link to homepage', () => {
    cy.get('.main-header.navbar a[href="/"]')
      .should('be.visible');
  }); 
  
  it('Should not link to teachers page before authentication', () => {
    cy.get('.main-header.navbar a[href="/teach"]')
      .should('not.exist');
  });

  it('Should link to teachers page if authentication', () => {
    cy.login();
    cy.get('.main-header.navbar a[href="/teach"]')
      .should('be.visible');
  });

})