describe('Homepage', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('Should link to login page', () => {
        cy.get('a[href="/login"]')
            .should('be.visible');
    });

    it('Should link to registration page', () => {
        cy.get('a[href="/signup"]')
            .should('be.visible')
    });

    it('Should load chapters', () => {
        cy.get('#chapters-container .chapter-card .chapter-title')
            .should('be.visible')
            .its('length')
            .should('be.gt', 1)

    });

    it('Should load extra chapters scroll', () => {
        cy.get('#chapters-container .chapter-card')
            .its('length')
            .then((chapterCount) => {


                cy.get('.infinity-loader')
                    .scrollIntoView()
                    .intercept(/\/api\/v1\/chapters?.*/).as('getChapters')
                    .wait('@getChapters')
                    .wait(300)
                    .get('#chapters-container .chapter-card')
                    .its('length')
                    .should('be.gt', chapterCount)
            })

    });
})
