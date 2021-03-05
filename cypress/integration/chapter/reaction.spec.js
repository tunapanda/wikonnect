import chapters from "../../fixtures/chapters.json";

// describe("Chapter Reaction Without Auth", () => {
//   beforeEach(() => {
//     cy.visit('/home')
//     cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()
//   });

//   it("Should see chapter reactions", () => {
//     cy.get(".reactions .reaction-btn.like-button").should("be.visible");
//     cy.get(".reactions .reaction-btn.dislike-button").should("be.visible");
//   });

//   it("Should not like a chapter", () => {
//     cy.get(".reactions .like-button").then(($btn) => {
//       const txt = $btn.text()
//       cy.get(".reactions .like-button").click().should(($btn2) => {
//         expect($btn2.text()).to.eq(txt)
//       })
//     })
//   });

//   it("Should not dislike a chapter", () => {

//     cy.get(".reactions .dislike-button").then(($btn) => {
//       const txt = $btn.text()
//       cy.get(".reactions .dislike-button").click().should(($btn2) => {
//         expect($btn2.text()).to.eq(txt)
//       })
//     })
//   });
// });

describe("Chapter Reaction After Auth", () => {
  beforeEach(() => {
    cy.login();
    cy.visit('/home')
    cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()
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

    cy.get(".reactions .reaction-btn.like-button").then(($btn) => {
      const txt = $btn.text()
      cy.get(".reactions .reaction-btn.like-button").should(($btn2) => {
        expect($btn2.text()).to.eq(txt)
      })
    })
    cy.get(".reactions .reaction-btn.dislike-button").then(($btn) => {
      const txt = $btn.text()
      cy.get(".reactions .reaction-btn.dislike-button").should(($btn2) => {
        expect($btn2.text()).to.eq(txt)
      })
    })
  });

  it("Should like a chapter", () => {
    cy.get(".reactions .reaction-btn.like-button").invoke('text').then(parseFloat).then((txt) => {
      cy.get(".reactions .reaction-btn.like-button").click().invoke('text').then(parseFloat).should('be.gte', txt)
    })
  });

  it("Should dislike a chapter", () => {
    cy.get(".reactions .reaction-btn.dislike-button").invoke('text').then(parseFloat).then((txt) => {
      cy.get(".reactions .reaction-btn.dislike-button").click().invoke('text').then(parseFloat).should('be.gte', txt)
    })
  });

  it("Should switch disliked chapter reaction", () => {
    cy.request('https://app.com/me')
      .its('body.campaign')
      .then((campaign) => {
        // runs different cypress test code
        // based on the type of campaign
        return campaigns.test(campaign)
      })
    // const { id, reaction } = dislikedChapter();

    // cy.visit(`/chapter/${id}`);

    // cy.get(".reactions .reaction-btn.like-button").click();

    // cy.get(".reactions .like-button .count").contains(reaction[0].likes + 1);

    // cy.get(".reactions .dislike-button .count").contains(reaction[0].dislikes - 1);
  });

  // it("Should switch liked chapter reaction", () => {
  //   const { id, reaction } = likedChapter();

  //   cy.visit(`/chapter/${id}`);

  //   cy.get(".reactions .reaction-btn.dislike-button").click();

  //   cy.get(".reactions .like-button .count").contains(reaction[0].likes - 1);

  //   cy.get(".reactions .dislike-button .count").contains(reaction[0].dislikes + 1);
  // });

  // it("Should retract previous liked chapter reaction", () => {
  //   const { id, reaction } = likedChapter();

  //   cy.visit(`/chapter/${id}`);

  //   cy.get(".reactions .reaction-btn.like-button")
  //     .click()
  //     .find(" .count")
  //     .contains(reaction[0].likes - 1);

  //   cy.get(".reactions .dislike-button .count").contains(reaction[0].dislikes);
  // });

  // it("Should retract previous disliked chapter reaction", () => {
  //   const { id, reaction } = dislikedChapter();

  //   cy.visit(`/chapter/${id}`);

  //   cy.get(".reactions .reaction-btn.dislike-button")
  //     .click()
  //     .find(" .count")
  //     .contains(reaction[0].dislikes - 1);

  //   cy.get(".reactions .like-button .count").contains(reaction[0].likes);
  // });
});
