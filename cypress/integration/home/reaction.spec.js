function freshChapter() {
    return cy.chapters({approved: true, page: 0, per_page: 10}).then((chapters) => {
        return chapters
            .filter((chapter) => chapter.authenticatedUser === null || chapter.authenticatedUser === 'null')[0]
    });
}

function likedChapter() {
    return cy.chapters({approved: true}).then((chapters) => {
        return chapters.filter((chapter) => chapter.authenticatedUser === 'like')[0]
    });
}

function dislikedChapter() {
    return cy.chapters({approved: true}).then((chapters) => {
        return chapters.filter((chapter) => chapter.authenticatedUser === 'dislike')[0]
    })
}

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

        freshChapter()
            .then((chapter) => {

                cy.get(`.card a[href="/chapter/${chapter.id}"].chapter-thumbnail:first`)
                    .siblings()
                    .find('.reactions')
                    .find('.like-button')
                    .click()
                    .find('.count')
                    .contains((chapter.reaction[0].likes) || 0);

            })
    });

    it('Should not dislike a chapter', () => {
        freshChapter()
            .then((chapter) => {

                cy.get(`.card a[href="/chapter/${chapter.id}"].chapter-thumbnail:first`)
                    .siblings()
                    .find('.reactions')
                    .find('.dislike-button')
                    .click()
                    .find('.count')
                    .contains((chapter.reaction[0].likes) || 0);

            })
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
