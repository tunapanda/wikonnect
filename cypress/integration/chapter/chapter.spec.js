describe('Chapter view', () => {

    beforeEach(() => {
        cy.login();
    });

    it('should display chapter details', () => {
        cy.visit('/');
        cy.get(':nth-child(1) > .card > .card-body > .card-title a').click();
        // Chapter title
        cy.get('.chapter-title > h4').should('exist').should('be.visible');
        // Chapter author
        cy.get('.chapter-author').should('exist').should('be.visible');
        // Chapter views and creation date
        cy.get('.chapter-metadata > p').should('exist').should('be.visible');
        // Chapter description
        cy.get('.chapter-description > p').should('exist').should('be.visible');
    });



})
