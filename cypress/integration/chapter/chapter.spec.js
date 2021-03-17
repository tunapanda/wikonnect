describe('Chapter view', () => {

    beforeEach(() => {
        cy.login();
    });

    it('should display chapter details', () => {
        cy.visit('/');
        cy.get(':nth-child(1) > .card > .card-body > .card-title a').click();
        cy.get('#chapter > h4').should('exist').should('be.visible');
    });



})
