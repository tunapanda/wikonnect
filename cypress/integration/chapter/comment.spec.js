describe('Chapter comments when authenticated', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/home')
        // cy.get('a .card-title .title-section').first().click()
        cy.get(':nth-child(1) > .card > .card-body > .card-title').click()
    });


    it('should display comment form', () => {
        cy.get('#chapter .padded form')
            .should('exist');

        cy.get('#chapter .padded form textarea')
            .should('be.visible');

        cy.get('#chapter .padded form button[type="submit"]')
            .should('be.visible');
    });

    it('should display created comment immediately', () => {
        const comment = {text: `Test comment randomly at ${Math.random() * 1000000}`};

        cy.get('#chapter .padded form textarea')
            .type(comment.text);

        cy.get('#chapter .padded form button[type="submit"]')
            .click();


        cy.get('#chapter .media-body')
            .contains(comment.text)
            .should('be.visible')
    });

    it('should notify on comment posting success', () => {
        const comment = {text: `Test notification randomly at ${Math.random() * 1000000}`};

        cy.get('#chapter .padded form textarea')
            .type(comment.text);

        cy.get('#chapter .padded form button[type="submit"]')
            .click();

        cy.get('.ember-notify.ember-notify-show.success .message')
            .should('be.visible')


    });

    it('should notify on comment posting error', () => {
        const comment = {text: `What the hell randomly at ${Math.random() * 1000000}`};

        cy.get('#chapter .padded form textarea')
            .type(comment.text);

        cy.get('#chapter .padded form button[type="submit"]')
            .click();

        cy.get('.ember-notify.ember-notify-show.alert .message')
            .should('be.visible');
    });

    it('should display comments', () => {
        cy.get('#chapter #comments')
            .should('exist')
            .should('be.visible');
    });

})


describe('Chapter comments without authentication', () => {

    beforeEach(() => {
        cy.visit('/home')
        cy.get(':nth-child(1) > .card > .card-body > .card-title').click()
    });


    it('should not display comment form', () => {
        cy.get('#chapter .padded form')
            .should('not.exist');
    });

    it('should display available comments', () => {
        cy.get('#chapter .media-body')
            .should('be.visible')
    });

})
