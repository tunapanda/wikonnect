import user from '../../fixtures/user.json';

describe('Sign up', () => {

    beforeEach(() => {
        cy.visit('/signup')
    })

    it('should not register user without data', () => {

        cy.get('#email input[type="text"]')
            .type('invalid@email')
            .blur()
            .get('#email .invalid-feedback')
            .should('be.visible');

        cy.get('.form button[type="submit"]')
            .click();

        cy.get('#username .invalid-feedback')
            .should('be.visible')
            .get('#email .invalid-feedback')
            .should('be.visible')
            .get('#password .invalid-feedback')
            .should('be.visible')
            .url()
            .should('include', '/signup');
    })

    it('should register new  user', () => {

        const username = `dummyaccount${new Date().getTime()}`;
        const password = 'dummypassword';
        const email = `${username}@dummyemail.com`;

        cy.get('.signup-form-fields #username input[type="text"]')
            .type(username)
            .should('have.value', username);

        cy.get('.signup-form-fields #email input[type="text"]')
            .type(email)
            .should('have.value', email);

        cy.get('.signup-form-fields #password input[type="password"]')
            .type(password)
            .should('have.value', password);

        cy.get('.signup-form-fields #confirm-password input[type="password"]')
            .type(password)
            .should('have.value', password);


        cy.get('.form button[type="submit"]')
            .click()
            .url()
            .should('include', '/upload')
    })

    it('should not register existing user', () => {
        cy.fixture('user')
            .then(({username, password, email}) => {

                cy.get('.signup-form-fields #username input[type="text"]')
                    .type(username)
                    .should('have.value', username);

                cy.get('.signup-form-fields #email input[type="text"]')
                    .type(email)
                    .should('have.value', email);

                cy.get('.signup-form-fields #password input[type="password"]')
                    .type(password)
                    .should('have.value', password);

                cy.get('.signup-form-fields #confirm-password input[type="password"]')
                    .type(password)
                    .should('have.value', password);


                cy.get('.form button[type="submit"]')
                    .click();

                cy.get('.alert.alert-danger')
                    .should('be.visible')
                    .should('contain.text', 'username already exists')
            });
    })

    it('should be redirected if already authenticated', () => {
        cy.login();
        cy.visit('/signup')
            .url()
            .should('not.include', 'signup')
    })

    it('links to login page', () => {
        cy.get('a[href="/login"]')
            .should('be.visible');
    });

    it('should have Google signup call to action', () => {
        cy.get('form button')
            .contains('Sign up with Google', {matchCase: false})
            .should('be.visible');
    });
})
