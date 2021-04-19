describe('User Profile Picture', () => {
    beforeEach(() => {
        cy.login();
        cy.visit('/upload');
    });

    /**
     *
     * @param filename fixture filename
     * @param mimeType e.g. 'image/jpg'
     * @returns {Cypress.Chainable<unknown>}
     */
    function uploadFile(filename, mimeType) {
        return cy.fixture(filename, 'binary')
            .then((img) => {
                const blob = Cypress.Blob.binaryStringToBlob(img, mimeType);

                const file = new File([blob], filename, {type: mimeType});
                const list = new DataTransfer();
                list.items.add(file);
                return list.files;
            })
            .then((files) => {
                cy.get('.upload-file-input')
                    .then((input) => {
                        input[0].files = files;
                    })
                    .trigger('change', {force: true})
            })
    }

    it('Should upload user profile picture', () => {
        uploadFile('test.jpg', 'image/jpg')
            .url()
            .should('include', '/profile');
    });

    it('Should not upload invalid image', () => {
        uploadFile('user.json', 'application/json')
            .url()
            .should('include', '/upload')
            .get('.ember-notify.ember-notify-show.alert .message')
            .should('be.visible');
    });
})