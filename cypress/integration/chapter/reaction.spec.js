describe("Chapter Reaction Without Auth", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(':nth-child(1) > .card > .card-body > .card-title a').click()
    cy.wait(1000);
  });

  it("Should see chapter reactions", () => {
    cy.get(".reactions .reaction-btn.like-button").should("be.visible");
    cy.get(".reactions .reaction-btn.dislike-button").should("be.visible");
  });

  it("Should not like a chapter", () => {
    cy.get(".reactions .like-button").then(($btn) => {
      const txt = $btn.text()
      cy.get(".reactions .like-button").click().should(($btn2) => {
        expect($btn2.text()).to.eq(txt)
      })
    })
  });

  it("Should not dislike a chapter", () => {

    cy.get(".reactions .dislike-button").then(($btn) => {
      const txt = $btn.text()
      cy.get(".reactions .dislike-button").click().should(($btn2) => {
        expect($btn2.text()).to.eq(txt)
      })
    })
  });
});

describe("Chapter Reaction After Auth", () => {
  beforeEach(() => {
    cy.login();
  });

  it("Should see chapter reactions", () => {
    cy.visit('/')
    cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()

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
    cy.visit('/')
    cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()
    cy.get(".reactions .reaction-btn.like-button").invoke('text').then(parseFloat).then((txt) => {
      cy.get(".reactions .reaction-btn.like-button").click().invoke('text').then(parseFloat).should('be.gte', txt)
    })
  });

  it("Should dislike a chapter", () => {
    cy.visit('/')
    cy.get(':nth-child(5) > .card > .card-body > .card-title a').click()
    cy.get(".reactions .reaction-btn.dislike-button").invoke('text').then(parseFloat).then((txt) => {
      cy.get(".reactions .reaction-btn.dislike-button").click().invoke('text').then(parseFloat).should('be.gte', txt)
    })
  });

  it("Should switch disliked chapter reaction", () => {
    cy.chapters().then((item) => {
      item.filter(function (item) {
        if (item.authenticatedUser === 'dislike') {
          cy.visit(`/chapter/${item.id}`);
          cy.get(".reactions .reaction-btn.like-button").click();
          cy.get(".reactions .like-button .count").contains(parseFloat(item.reaction[0].likes) + 1);
          cy.get(".reactions .dislike-button .count").contains(parseFloat(item.reaction[0].dislikes) - 1);
          return false;
        }
      })
    });
  });

  it("Should switch liked chapter reaction", () => {
    cy.chapters().then((item) => {
      item.filter(function (item) {
        if (item.authenticatedUser === 'like') {
          cy.visit(`/chapter/${item.id}`);
          cy.get(".reactions .reaction-btn.dislike-button").click();
          cy.get(".reactions .like-button .count").contains(parseFloat(item.reaction[0].likes) - 1);
          cy.get(".reactions .dislike-button .count").contains(parseFloat(item.reaction[0].dislikes) + 1);
          return false;
        }
      })
    });
  });

  it("Should retract previous liked chapter reaction", () => {
    cy.chapters().then((item) => {
      item.filter(function (item) {
        if (item.authenticatedUser === 'like') {
          cy.visit(`/chapter/${item.id}`);
          cy.get(".reactions .reaction-btn.like-button").click()
            .find(" .count")
            .contains(parseFloat(item.reaction[0].likes) - 1);
          cy.get(".reactions .dislike-button .count").contains(item.reaction[0].dislikes);
          return false;
        }
      })
    });
  });

  it("Should retract previous disliked chapter reaction", () => {
    cy.chapters().then((item) => {
      item.filter(function (item) {
        if (item.authenticatedUser === 'dislike') {
          cy.visit(`/chapter/${item.id}`);
          cy.get(".reactions .reaction-btn.dislike-button").click()
            .find(" .count")
            .contains(parseFloat(item.reaction[0].dislikes) - 1);
          cy.get(".reactions .like-button .count").contains(item.reaction[0].likes);
          return false;
        }
      })
    });
  });
});
