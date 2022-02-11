describe("User can create chapter", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/create");
  });
  // TODO @brianmarete update tests to match new teach page
  it("should display chapter details in preview after submitting details", () => {
    // const chapter = {name: 'test', description: 'test description'};
    // const tag = "test";
    // cy.get('a.btn.bg-primary').click();
    // // Name and Description
    // cy.get('.basic-h5p-details-section form input.form-control')
    //   .type(chapter.name);
    // cy.get('.basic-h5p-details-section form textarea.form-control')
    //   .type(chapter.description);
    // cy.get('.basic-h5p-details-section form button[type="submit"]')
    //   .click();
    // H5P Upload
    // cy.intercept(/api\/v1\/chapters\/.*\/upload/).as('h5pUpload');
    // cy.get('input[type="file"]').attachFile({filePath: 'test.h5p', encoding: 'base64'});
    // cy.wait('@h5pUpload');
    //
    // // Thumbnail Upload
    // cy.intercept(/api\/v1\/chapters\/.*\/chapter-image/).as("imgUpload");
    // cy.get('input[type="file"]').attachFile({filePath: 'test.jpg', encoding: 'base64'});
    // cy.wait("@imgUpload");
    // // cy.get('button.btn.btn-warning').click();
    //
    // // Tag
    // cy.get('.p-4 input.form-control').type(tag);
    // cy.get('.p-4 > form > .btn').click();
    // cy.get('.m-1').should('be.visible').and('contain', tag);
    // cy.get('.float-right').click();
    //
    // // Preview
    // cy.get('.h5p-iframe-wrapper').should('be.visible');
    //
    // cy.get('span.badge')
    //   .should('be.visible')
    //   .and('contain', tag);
    //
    // cy.get('input.form-control.bg-light')
    //   .should('be.visible')
    //   .and('have.value', chapter.name);
    //
    // cy.get('textarea.form-control.bg-light')
    //   .should('be.visible')
    //   .and('have.value', chapter.description);
    //
    // cy.get('img.img-thumbnail')
    //   .should('be.visible');
  });
});
