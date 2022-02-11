describe("Badges homepage", () => {
  function fetchBadges() {
    return cy.badges({ isDeleted: false });
  }

  beforeEach(() => {
    cy.login();
    cy.visit("/admin/badges");
  });

  it("should see badge creation prompt on section header cards", () => {
    cy.get(".action-prompt-card")
      .find('a[href="/admin/badges/manage"]')
      .should("be.visible");
  });

  it("should see badges total", () => {
    fetchBadges().then((badges) => {
      cy.get(".badges-total-card")
        .find(".badges-total-count")
        .should("be.visible")
        .contains(badges.length);
    });
  });

  it("should see total badges earned", () => {
    //TODO: following only checks that's the card is visible. not if the count matches the backend
    cy.get(".badges-earned-total-card")
      .find(".badges-total-count")
      .should("be.visible");
  });
});

describe("Badges homepage table view", () => {
  function fetchBadges() {
    return cy.badges({ isDeleted: false });
  }

  beforeEach(() => {
    cy.login();
    cy.visit("/admin/badges");
  });

  it("should see table with all badges", () => {
    cy.get("table.badges-table tbody tr")
      .should("have.length.at.least", 1)
      .should("be.visible")
      .invoke("text")
      .should("have.length.at.least", 1);
  });

  it("Rows should have a link to a detailed badge view ", () => {
    cy.get("table.badges-table tbody tr")
      .eq(1)
      .within(() => {
        cy.get("a.details-btn")
          .focus()
          .should("be.visible")
          .should("have.attr", "href")
          .and("include", "/admin/badges/manage");
      });
  });

  it("Rows should have a link to edit page ", () => {
    cy.get("table.badges-table tbody tr")
      .eq(1)
      .within(() => {
        cy.get(".extra-actions .dropdown-toggle")
          .click()
          .siblings()
          .focus()
          .find("a")
          .should("have.attr", "href")
          .and("include", "/admin/badges/manage");
      });
  });

  it("should be able to search badges", () => {
    fetchBadges().then((badges) => {
      const selectedBadge = badges[Math.floor(Math.random() * badges.length)];

      cy.get(".submenu-section .badges-search .search-input").type(
        selectedBadge.description.substr(0, 30)
      );

      //select all on current view
      cy.get("table.badges-table tbody tr td").contains(selectedBadge.name);
    });
  });

  it("should be able to change badges displayed per table page", () => {
    cy.get(".footer-pagination #perPage").select("20");

    fetchBadges().then((badges) => {
      if (badges.length > 20) {
        cy.get("table.badges-table tbody tr").should("have.length", 20);
      } else {
        cy.get("table.badges-table tbody tr").should("have.length.below", 20);
      }
    });
  });

  /**
   * Placement of following tests is by design. Don't move them
   */
  it("should be able to delete individual badge", () => {
    fetchBadges().as("original");
    cy.get("table.badges-table tbody tr")
      .eq(1)
      .within(() => {
        cy.get(".extra-actions .dropdown-toggle")
          .click()
          .siblings()
          .focus()
          .find("button.btn-delete-badge")
          .should("be.visible")
          .click();

        fetchBadges().then((badges) => {
          cy.get("@original").then((obj) => {
            expect(badges.length).to.equal(obj.length - 1);
          });
        });
      });
  });
  // TODO: This test is flaky
  // it('should be able to bulk delete badges', () => {

  //     fetchBadges().its('length').as('originalBadgesTotal');

  //     cy.get('table.badges-table tbody tr').its('length').as('selectableRows');

  //     //select all on current view
  //     cy.get('table.badges-table thead tr td')
  //         .eq(0)
  //         .find('input')
  //         .click();

  //     cy.get('.submenu-section .bulk-menu-dd .dropdown-toggle ')
  //         .click()
  //         .siblings()
  //         .focus()
  //         .find('button.btn-delete-all')
  //         .click();

  //     fetchBadges().then((badges) => {
  //         cy.get('@originalBadgesTotal')
  //             .then((originalBadgesTotal) => {
  //                 cy.get('@selectableRows')
  //                     .then((deletedRowsTotal) => {
  //                         expect(badges.length).to.equal(originalBadgesTotal - deletedRowsTotal)

  //                     })
  //             })
  //     })

  // });
});
