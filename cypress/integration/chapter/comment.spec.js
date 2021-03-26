describe('Chapter comments when authenticated', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/')
        cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()
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
        cy.get('div#comments-section')
            .should('exist');
    });

})


describe('Chapter comments without authentication', () => {

    beforeEach(() => {
        cy.visit('/')
        cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()
    });


    it('should not display comment form', () => {
        cy.get('#chapter .padded form')
            .should('not.exist');
    });

    it('should display available comments', () => {
        cy.get('#chapter #comments-section')
            .should('exist')
    });

});

describe('Comment Replies', () => {
    it('should be able to reply to a comment', () => {
        const reply = `Test reply randomly at ${Math.random() * 1000000}`;

        cy.login();
        cy.visit('/');
        cy.get(':nth-child(5) > .card > .card-body > .card-title a').click();
        cy.get('#chapter .padded form textarea').type('Memento Mori');
        cy.get('#chapter .padded form button[type="submit"]').click();

        cy.get('#comments-section > :nth-child(1) > .media-body > .reply-actions > :nth-child(2) > button')
            .click();

        cy.get('.reply-form textarea').should('be.visible');
       
        cy.get('.reply-form textarea').type(reply);
        cy.get('.reply-form button').click();

        cy.get(
          "#comments-section > :nth-child(1) > .media-body > .media > .replies"
        )
          .contains(reply)
          .should('be.visible');
    });


})

