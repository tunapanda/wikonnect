describe('Homepage Chapter Reactions After Auth', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/');
    })

    it('Should see chapter reactions', () => {
        cy.get('.reactions .reaction-btn.like-button')
            .should('be.visible');

        cy.get('.reactions .reaction-btn.dislike-button')
            .should('be.visible');
    });


    it('Should not like a chapter', () => {

        cy.chapters().then((item) => {

            item.filter(function (item) {
                if (item.authenticatedUser === null) {
                    cy.get(`:nth-child(1) > .card a[href="/chapter/${item.id}"]:first`)
                        .siblings()
                        .find('.reactions')
                        .find('.like-button')
                        .click()
                        .find('.count')
                        .contains(0);
                    return false;
                }
            })
        });
    });

    it('Should not dislike a chapter', () => {

        cy.chapters().then((item) => {
            item.filter(function (item) {
                if (item.authenticatedUser === null) {
                    cy.get(`:nth-child(1) > .card a[href="/chapter/${item.id}"]:first`)
                        .siblings()
                        .find('.reactions')
                        .find('.dislike-button')
                        .click()
                        .find('.count')
                        .contains(0);
                    return false;
                }
            })
        });
    });

})

describe('Homepage Chapter Reactions Without Auth', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Should see chapter reactions', () => {
        cy.get('.reactions .reaction-btn.like-button')
            .should('be.visible');

        cy.get('.reactions .reaction-btn.dislike-button')
            .should('be.visible');
    });

})
