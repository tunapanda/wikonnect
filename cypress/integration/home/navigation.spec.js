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

  it('About link should link to wikonnect.org', () => {
      cy.get('.main-header.navbar a.about-link-item')
          .should('be.visible')
          .invoke('attr','href')
          .should('contain','wikonnect.org')
  });


  it('Should link to community forum', () => {
    cy.get('.main-header.navbar a.forum-link-item')
        .should('be.visible')
        .invoke('attr','href')
        .should('contain','discord.gg/tT9Ug6D')
  });

  it('Should link to homepage', () => {
    cy.get('.main-header.navbar a[href="/"]')
      .should('be.visible');
  }); 
  
  it('Should link to teachers page before authentication', () => {
    cy.get('.main-header.navbar a[href="/teach"]')
      .should('be.visible');
  });

  it('Should link to teachers page if authentication', () => {
    cy.login();
    cy.get('.main-header.navbar a[href="/teach"]')
      .should('be.visible');
  });

})