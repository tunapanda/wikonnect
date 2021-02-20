import chapters from '../../fixtures/chapters.json'

describe('Chapter Reaction Without Auth', () => {

    function newChapter() {
        return chapters.find((chapter) => !chapter.reaction.authenticated_user);
    }

    it('Should see chapter reactions', () => {
        const {id} = newChapter();

        cy.visit(`/chapter/${id}`);

        cy.get('.reactions .reaction-btn.like-button')
            .should('be.visible');

        cy.get('.reactions .reaction-btn.dislike-button')
            .should('be.visible');
    });

    it('Should not like a chapter', () => {
        const {id} = newChapter();

        cy.visit(`/chapter/${id}`);

        cy.get('.reactions .like-button')
            .click();

        cy.get('.reactions .like-button .count')
            .contains(0);

    });

    it('Should not dislike a chapter', () => {
        const {id} = newChapter();

        cy.visit(`/chapter/${id}`);

        cy.get('.reactions .dislike-button')
            .click();

        cy.get('.reactions .dislike-button .count')
            .contains(0);

    });
})


describe('Chapter Reaction After Auth', () => {

    beforeEach(() => {
        cy.login();
    })

    function likedChapter() {
        return chapters.find((chapter) => chapter.reaction.authenticated_user === 'like');
    }

    function dislikedChapter() {
        return chapters.find((chapter) => chapter.reaction.authenticated_user === 'dislike');
    }

    function newChapter() {
        return chapters.find((chapter) => !chapter.reaction.authenticated_user);
    }

    it('Should see chapter reactions', () => {
        const {id} = newChapter();
        cy.visit(`/home/`)
            .get(`a[href="/chapter/${id}"]:first`)
            .click();

        cy.get('.reactions .reaction-btn.like-button')
            .should('be.visible')
            .contains(0);

        cy.get('.reactions .reaction-btn.dislike-button')
            .should('be.visible')
            .contains(0);
    });

    it('Should like a chapter', () => {
        const {id, reaction} = newChapter();
        cy.visit(`/home/`)
            .get(`a[href="/chapter/${id}"]:first`)
            .click();


        cy.get('.reactions .reaction-btn.like-button')
            .click()
            .find('.count')
            .contains((reaction.likes || 0) + 1);
    });

    it('Should dislike a chapter', () => {
        const {id, reaction} = newChapter();
        cy.visit(`/home/`)
            .get(`a[href="/chapter/${id}"]:first`)
            .click();

        cy.get('.reactions .reaction-btn.dislike-button')
            .click()
            .find('.count')
            .contains((reaction.dislikes || 0) + 1);
    });

    it('Should switch disliked chapter reaction', () => {
        const {id, reaction} = dislikedChapter();

        cy.visit(`/chapter/${id}`);

        cy.get('.reactions .reaction-btn.like-button')
            .click()
            .visit('/home')
            .visit(`/chapter/${id}`);

        cy.get('.reactions .like-button .count')
            .contains(reaction.likes + 1);

        cy.get('.reactions .dislike-button .count')
            .contains(reaction.dislikes - 1);
    });

    it('Should switch liked chapter reaction', () => {
        const {id, reaction} = likedChapter();

        cy.visit(`/chapter/${id}`);

        cy.get('.reactions .reaction-btn.dislike-button')
            .click()
            .visit('/home')
            .visit(`/chapter/${id}`);


        cy.get('.reactions .like-button .count')
            .contains(reaction.likes - 1);

        cy.get('.reactions .dislike-button .count')
            .contains(reaction.dislikes + 1);
    });

})

