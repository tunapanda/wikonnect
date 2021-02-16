describe('Landing Page',()=>{

    beforeEach(()=>{
        cy.visit('/');
    });

    it('links to login view',()=>{
        cy.get('a[href="/login"]')
            .should('be.visible');
    });

    it('links to registration view',()=>{
        cy.get('a[href="/signup"]')
            .should('be.visible')
    });

})
