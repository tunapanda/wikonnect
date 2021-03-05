describe('Chapter view', () => {

    beforeEach(() => {
        cy.login();
    });

    it('should display chapter details', () => {
        cy.visit('/home');
        cy.get(':nth-child(1) > .card > .card-body > .card-title').click();
        cy.wait(10000);

        cy.get('#chapter > h4').should('exist').should('be.visible');
    });



})
