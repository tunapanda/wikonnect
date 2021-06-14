function likedChapter() {
    return cy.chapters({approved: true}).then((chapters) => {
        return chapters.filter((ch) => { return ch.reviewQuestions &&
            (ch.authenticatedUser === 'like' || ch.authenticatedUser === null)})[0]
    });
}

function dislikedChapter() {
    return cy.chapters({approved: true}).then((chapters) => {
        return chapters.filter((ch) => { return ch.reviewQuestions &&
            (ch.authenticatedUser === 'dislike' || ch.authenticatedUser === null)})[0]
    });
}


describe('Chapter ratings & review when authenticated', () => {

    beforeEach(() => {
        cy.login();

    });

    it('Should be able to provide negative ratings & review', () => {
        likedChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .reaction-btn.dislike-button")
                    .click();

                cy.get('.reaction-feedback-popover.negative-feedback')
                    .scrollIntoView()
                    .should('be.visible')
                    .find('.prompt-button')
                    .click()
                    .get('.reaction-feedback-popover')
                    .should('not.exist');

                cy.get('.rating-review-section  .gesture-icon')
                    .scrollIntoView()
                    .should('be.visible')
                    .get('.rating-review-section')
                    .find('.question')
                    .then((questions) => {
                        const buttons = ["terrible", "bad", "okay", "good", "great"]
                        const totalQuestions = questions.length;
                        for (let i = 0; i < totalQuestions; i++) {
                            cy.get(questions[i])
                                .find('textarea')
                                .type(`Random feedback ${Math.random() * 1000000}`);
                            if (i !== totalQuestions - 1) {
                                cy.get(questions[i])
                                    .find(`button.rating-emoji.${buttons[Cypress._.random(0, 4)]}`)
                                    .click();
                            }
                        }

                    })
                    .get('.submit-ratings-and-review-btn')
                    .click();

                cy.get('.rating-review-feedback-modal .modal-body')
                    .should('be.visible');
            });
    });

    it('Should be able to provide positive ratings & review', () => {
        dislikedChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .reaction-btn.like-button")
                    .click();

                cy.get('.reaction-feedback-popover.positive-feedback')
                    .scrollIntoView()
                    .should('be.visible')
                    .find('.prompt-button')
                    .click()
                    .get('.reaction-feedback-popover')
                    .should('not.exist');

                cy.get('.rating-review-section .gesture-icon')
                    .scrollIntoView()
                    .should('be.visible')
                    .get('.rating-review-section')
                    .find('.question')
                    .then((questions) => {
                        const buttons = ["terrible", "bad", "okay", "good", "great"]
                        const totalQuestions = questions.length;
                        for (let i = 0; i < totalQuestions; i++) {
                            cy.get(questions[i])
                                .find('textarea')
                                .type(`Random feedback ${Math.random() * 1000000}`);
                            if (i !== totalQuestions - 1) {
                                cy.get(questions[i])
                                    .find(`button.rating-emoji.${buttons[Cypress._.random(0, 4)]}`)
                                    .click();
                            }
                        }

                    })
                    .get('.submit-ratings-and-review-btn')
                    .click();

                cy.get('.rating-review-feedback-modal .modal-body')
                    .should('be.visible')
            });
    });

    it('Should be able to skip negative ratings & review', () => {
        likedChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .reaction-btn.dislike-button")
                    .click();

                cy.get('.reaction-feedback-popover.negative-feedback')
                    .scrollIntoView()
                    .should('be.visible')
                    .find('.prompt-button')
                    .click();

                cy.get('.rating-review-section .gesture-icon')
                    .scrollIntoView()
                    .should('be.visible')
                    .get('.skip-ratings-and-review-btn')
                    .click()

                cy.get('.rating-review-section')
                    .should('not.exist')
            });
    });

    it('Should be able to skip positive ratings & review', () => {
        dislikedChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .reaction-btn.like-button")
                    .click();

                cy.get('.reaction-feedback-popover.positive-feedback')
                    .scrollIntoView()
                    .should('be.visible')
                    .find('.prompt-button')
                    .click();

                cy.get('.rating-review-section  .gesture-icon')
                    .scrollIntoView()
                    .should('be.visible')
                    .get('.skip-ratings-and-review-btn')
                    .click()

                cy.get('.rating-review-section')
                    .should('not.exist')
            });
    });
})