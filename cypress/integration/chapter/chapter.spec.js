describe('Chapter view', () => {

    beforeEach(() => {
        cy.login();
    });

    it('should display chapter details', () => {
        cy.visit('/chapter/chapter1');

        cy.get('#chapter h4').contains('A Chapter');
    });



})
