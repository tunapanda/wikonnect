describe('Public User Profile', () => {
    beforeEach(() => {
        cy.fixture('user')
            .then((acc) => {
                cy.intercept(`/api/v1/users/${acc.id}`).as('userRequest')
                    .visit(`/profile/${acc.id}/home`)
                    .wait('@userRequest')
                    .get('@userRequest')
                    .then((res) => {
                        cy.wrap(res.response.body.user).as('user')
                    })
            })
    })


    it('Should show user details card', function () {

        cy.get('.account-profile-page .profile-card')
            .within(function () {
                cy.get('@user')
                    .then((user) => {

                        cy.get('.role')
                            .should(user.userRoles && user.userRoles[0] ? 'be.visible' : 'exist');

                        cy.get('.account-bio')
                            .should(user.metadata && user.metadata.aboutMe ? 'be.visible' : 'exist');
                    })
            });

    });

    it('Should see user achievements ', () => {
        cy.get('.achievement-card.created-chapters')
            .within(() => {
                cy.get('.section-title')
                    .should('exist');
                cy.get('.count')
                    .should('exist');

            });

        cy.get('.achievement-card.completed-chapters')
            .within(() => {
                cy.get('.section-title')
                    .should('exist');
                cy.get('.count')
                    .should('exist');

            });

        cy.get('.achievement-card.earned-points ')
            .within(() => {
                cy.get('.section-title')
                    .should('exist');
                cy.get('.count')
                    .should('exist');

            });
    });

    it('Should see key links', function () {

        cy.get('.account-profile-page .sections-menu')
            .within(function () {
                cy.get('@user')
                    .then((user) => {

                        cy.get(`a[href="/profile/${user.id}/home"]`)
                            .should('be.visible');

                        cy.get(`a[href="/profile/${user.id}/achievements"]`)
                            .should('be.visible');
                    });


            })
    })

    it('Should not show user private details ', () => {
        cy.get('.account-profile-page .profile-card .right-container')
            .within(() => {
                cy.get('.phone')
                    .should('not.exist');

                cy.get('.email')
                    .should('not.exist');

                cy.get('.location')
                    .should('not.exist');

            })
    })

    it('Should not see edit page link ', () => {
        cy.get('.account-profile-page .profile-card ')
            .within(() => {
                cy.get('a[href="/profile/edit"]')
                    .should('not.exist');
            })
    })

});

describe('Private User Profile', () => {
    beforeEach(() => {
        cy.fixture('user')
            .then((acc) => {
                cy.login()
                    .intercept('GET', `/api/v1/users/${acc.id}`).as('userRequest')
                    .visit(`/profile/${acc.id}/home`)

            })
    })


    it('Should show user details card', function () {


        cy.get('.account-profile-page .profile-card .account-bio')
            .should('not.exist')
        cy.get('.account-profile-page .profile-card')
            .within(function () {
                cy.wait('@userRequest')
                    .then((res) => {
                        return res.response.body.user
                    })
                    .then((user) => {

                        cy.get('.role')
                            .should(user.userRoles && user.userRoles[0] ? 'be.visible' : 'exist');


                        cy.get('.phone')
                            .should(user.contactNumber ? 'be.visible' : 'exist');

                        cy.get('.email')
                            .should(user.email ? 'be.visible' : 'exist');

                        cy.get('.location')
                            .should(user.location ? 'be.visible' : 'exist');
                    })
            });

    });


    it('Should not show user bio', () => {

        cy.get('.account-profile-page .profile-card .account-bio')
            .should('not.exist')
    })

    it('Should see user achievements ', () => {
        cy.get('.achievement-card.created-chapters')
            .within(() => {
                cy.get('.section-title')
                    .should('exist');
                cy.get('.count')
                    .should('exist');

            });

        cy.get('.achievement-card.completed-chapters')
            .within(() => {
                cy.get('.section-title')
                    .should('exist');
                cy.get('.count')
                    .should('exist');

            });

        cy.get('.achievement-card.earned-points ')
            .within(() => {
                cy.get('.section-title')
                    .should('exist');
                cy.get('.count')
                    .should('exist');

            });
    });

    it('Should see key links', function () {

        cy.get('.account-profile-page .sections-menu')
            .within(function () {
                cy.fixture('user')
                    .then((user) => {

                        cy.get(`a[href="/profile/${user.id}/home"]`)
                            .should('be.visible');

                        cy.get(`a[href="/profile/${user.id}/achievements"]`)
                            .should('be.visible');
                    });


            })
    })


    it('Should  see edit page link ', () => {
        cy.get('.account-profile-page .profile-card ')
            .within(() => {
                cy.get('a[href="/profile/edit"]')
                    .should('be.visible');
            })
    })

});

