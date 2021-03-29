function freshChapter() {
    return cy.chapters({approved: true}).then((chapters) => {
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
    });
}

describe("Chapter Reaction Without Auth", () => {

    it("Should see chapter reactions", () => {
        freshChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`)

                cy.get(".reactions .reaction-btn.like-button").should("be.visible");
                cy.get(".reactions .reaction-btn.dislike-button").should("be.visible");
            });
    });

    it("Should not like a chapter", () => {
        freshChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .like-button")
                    .click()
                    .contains(chapter.reaction[0].likes)
            })
    });

    it("Should not dislike a chapter", () => {
        freshChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .dislike-button")
                    .click()
                    .contains(chapter.reaction[0].dislikes)
            })
    });
});

describe("Chapter Reaction After Auth", () => {
    beforeEach(() => {
        cy.login();
    });

    it("Should see chapter reactions", () => {
        freshChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .reaction-btn.like-button")
                    .contains(chapter.reaction[0].likes);
                cy.get(".reactions .reaction-btn.dislike-button")
                    .contains(chapter.reaction[0].dislikes);
            });
    });

    it("Should like a chapter", () => {
        freshChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`);

                cy.get(".reactions .reaction-btn.like-button")
                    .click();

                cy.get(".reactions .reaction-btn.like-button")
                    .contains(+chapter.reaction[0].likes + 1);
            });
    });

    it("Should dislike a chapter", () => {
        freshChapter()
            .then((chapter) => {
                cy.visit(`/chapter/${chapter.id}`)
                    .get(".reactions .reaction-btn.dislike-button")
                    .click();

                cy.get(".reactions .reaction-btn.dislike-button")
                    .contains(+chapter.reaction[0].dislikes + 1);
            });
    });

    it("Should switch disliked chapter reaction", () => {
        dislikedChapter().then((chapter) => {
            cy.visit(`/chapter/${chapter.id}`);
            cy.get(".reactions .reaction-btn.like-button").click();

            cy.get(".reactions .like-button .count")
                .contains(+chapter.reaction[0].likes + 1)
                .get(".reactions .dislike-button .count")
                .contains(+chapter.reaction[0].dislikes - 1);
        });
    });

    it("Should switch liked chapter reaction", () => {
        likedChapter().then((chapter) => {

            cy.visit(`/chapter/${chapter.id}`);

            cy.get(".reactions .reaction-btn.dislike-button").click();
            cy.get(".reactions .like-button .count")
                .contains(parseFloat(chapter.reaction[0].likes) - 1)
                .get(".reactions .dislike-button .count")
                .contains(parseFloat(chapter.reaction[0].dislikes) + 1);
        });
    });

    it("Should retract previous liked chapter reaction", () => {
        likedChapter().then((chapter) => {
            cy.visit(`/chapter/${chapter.id}`);
            cy.get(".reactions .reaction-btn.like-button").click()
                .find(" .count")
                .contains(parseFloat(chapter.reaction[0].likes) - 1);
            cy.get(".reactions .dislike-button .count").contains(chapter.reaction[0].dislikes);
        });
    });

    it("Should retract previous disliked chapter reaction", () => {
        dislikedChapter().then((chapter) => {
            cy.visit(`/chapter/${chapter.id}`);

            cy.get(".reactions .reaction-btn.dislike-button").click()
                .find(" .count")
                .contains(parseFloat(chapter.reaction[0].dislikes) - 1)
                .get(".reactions .like-button .count")
                .contains(chapter.reaction[0].likes);
        });
    });
});
