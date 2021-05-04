import user from '../../fixtures/user.json'

describe('Login page', () => {

    beforeEach(() => {
        cy.visit('/login');
    });


    it('should not sign in user without credentials', () => {
        cy.get('.login-form button[type="submit"]')
            .click();

        cy.get('#username .invalid-feedback')
            .should('be.visible')
            .get('#password .invalid-feedback')
            .should('be.visible')
            .url()
            .should('include', '/login');
    })

    it('should not sign in user with incorrect credentials', () => {

        const password = `password${Math.random()}`;
        const username = `usertest`;

        cy.get('.login-form-fields #username input[type="text"]')
            .type(username)
            .should('have.value', username);

        cy.get('.login-form-fields #password input[type="password"]')
            .type(password)
            .should('have.value', password);

        cy.get('.login-form button[type="submit"]')
            .click();

        cy.get('.ember-notify.ember-notify-show.alert .message')
            .should('be.visible')
            .url()
            .should('include', '/login');
    })

    it('links to signup page', () => {
        cy.get('a[href="/signup"]')
            .should('be.visible');
    });

    it('should have Google login call to action', () => {
        cy.get('form button')
            .contains('Log In With Google', {matchCase: false})
            .should('be.visible');
    });

    it('should sign in user with correct credentials', () => {

        const {password, username} = user;

        cy.get('.login-form-fields #username input[type="text"]')
            .type(username)
            .should('have.value', username);

        cy.get('.login-form-fields #password input[type="password"]')
            .type(password)
            .should('have.value', password);

        cy.get('.login-form button[type="submit"]')
            .click()
            .url()
            .should('include', '/');
    })

})
