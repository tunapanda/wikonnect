describe('Google', function () {
  beforeEach(function () {
    // cy.task('db:seed')
    cy.loginByGoogleApi()
  })

  it('Show profile page', function () {
    cy.visit('/profile')
  })
})