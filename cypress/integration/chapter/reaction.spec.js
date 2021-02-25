import chapters from "../../fixtures/chapters.json";

describe("Chapter Reaction Without Auth", () => {
  function newChapter() {
    return chapters.find((chapter) => !chapter.reaction[0]);
  }

  it("Should see chapter reactions", () => {
    const { id } = newChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.like-button").should("be.visible");

    cy.get(".reactions .reaction-btn.dislike-button").should("be.visible");
  });

  it("Should not like a chapter", () => {
    const { id } = newChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .like-button").click();

    cy.get(".reactions .like-button .count").contains(0);
  });

  it("Should not dislike a chapter", () => {
    const { id } = newChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .dislike-button").click();

    cy.get(".reactions .dislike-button .count").contains(0);
  });
});

describe("Chapter Reaction After Auth", () => {
  beforeEach(() => {
    cy.login();
  });

  function likedChapter() {
    return chapters.find(
      (chapter) => chapter.authenticatedUser === "like"
    );
  }

  function dislikedChapter() {
    return chapters.find(
      (chapter) => chapter.authenticatedUser === "dislike"
    );
  }

  function newChapter() {
    return chapters.find((chapter) => !chapter.reaction[0]);
  }

  it("Should see chapter reactions", () => {
    const { id } = newChapter();
    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.like-button")
      .should("be.visible")
      .contains(0);

    cy.get(".reactions .reaction-btn.dislike-button")
      .should("be.visible")
      .contains(0);
  });

  it("Should like a chapter", () => {
    const { id, reaction } = newChapter();
    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.like-button")
      .click()
      .find(".count")
      .contains(1);
  });

  it("Should dislike a chapter", () => {
    const { id, reaction } = newChapter();
    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.dislike-button")
      .click()
      .find(".count")
      .contains(1);
  });

  it("Should switch disliked chapter reaction", () => {
    const { id, reaction } = dislikedChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.like-button").click();

    cy.get(".reactions .like-button .count").contains(reaction[0].likes + 1);

    cy.get(".reactions .dislike-button .count").contains(reaction[0].dislikes - 1);
  });

  it("Should switch liked chapter reaction", () => {
    const { id, reaction } = likedChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.dislike-button").click();

    cy.get(".reactions .like-button .count").contains(reaction[0].likes - 1);

    cy.get(".reactions .dislike-button .count").contains(reaction[0].dislikes + 1);
  });

  it("Should retract previous liked chapter reaction", () => {
    const { id, reaction } = likedChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.like-button")
      .click()
      .find(" .count")
      .contains(reaction[0].likes - 1);

    cy.get(".reactions .dislike-button .count").contains(reaction[0].dislikes);
  });

  it("Should retract previous disliked chapter reaction", () => {
    const { id, reaction } = dislikedChapter();

    cy.visit(`/chapter/${id}`);

    cy.get(".reactions .reaction-btn.dislike-button")
      .click()
      .find(" .count")
      .contains(reaction[0].dislikes - 1);

    cy.get(".reactions .like-button .count").contains(reaction[0].likes);
  });
});
