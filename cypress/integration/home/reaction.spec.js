import chapters from "../../fixtures/chapters.json";

describe('Homepage Chapter Reactions After Auth', () => {

    beforeEach(() => {
        cy.login();
        cy.visit('/home');
    })

    function newChapter() {
        return chapters.find((chapter) => !chapter.reaction.authenticated_user);
    }


    it('Should see chapter reactions', () => {
        cy.login();

        cy.get('.reactions .reaction-btn.like-button')
            .should('be.visible');

        cy.get('.reactions .reaction-btn.dislike-button')
            .should('be.visible');
    });


    it('Should not like a chapter', () => {
        const {id, reaction} = newChapter();

        cy.get(`.card a[href="/chapter/${id}"]:first`)
            .siblings()
            .find('.reactions')
            .find('.like-button')
            .click()
            .find('.count')
            .contains((reaction.likes)||0);
    });

    it('Should not dislike a chapter', () => {
        const {id, reaction} = newChapter();

        cy.get(`.card a[href="/chapter/${id}"]:first`)
            .siblings()
            .find('.reactions')
            .find('.dislike-button')
            .click()
            .find('.count')
            .contains((reaction.likes)||0);
    });

})

describe('Homepage Chapter Reactions Without Auth', () => {

    beforeEach(() => {
        cy.visit('/home')
    })

    it('Should see chapter reactions', () => {

        cy.get('.reactions .reaction-btn.like-button')
            .should('be.visible');

        cy.get('.reactions .reaction-btn.dislike-button')
            .should('be.visible');
    });

})
