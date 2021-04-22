describe('Notifications', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/');
    });


    it('Should show notification bell and count', () => {
        cy.get('.main-header.navbar .notifications-dropdown .nav-link')
            .get('svg')
            .should('be.visible')
            .get('.count')
            .should('be.visible');
    });

    it('Should show notifications popup', () => {
        cy.get('.main-header.navbar .notifications-dropdown .nav-link')
            .click();
        cy.get('.notification-items')
            .find('.notification-item')
            .should('be.visible')
    });
});

