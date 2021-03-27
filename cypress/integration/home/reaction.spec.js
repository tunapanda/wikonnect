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
        cy.get(":nth-child(1) > .card > .card-body > .actions-section > :nth-child(1) > .reactions > .like-button")
            .then(($like) => {
                const count = $like.find(".count").text();
                cy.get($like).click();
                cy.expect($like.find(".count").text()).to.equal(count);
            });
    });

    it('Should not dislike a chapter', () => {
        cy.get(":nth-child(1) > .card > .card-body > .actions-section > :nth-child(1) > .reactions > .dislike-button")
            .then(($dislike) => {
                const count = $dislike.find(".count").text();
                cy.get($dislike).click();
                expect($dislike.find(".count").text()).to.equal(count);
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
