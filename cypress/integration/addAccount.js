describe('Test adding account', () => {
  beforeEach(() => {
    cy.visit('/accounts')
  })

  it('add account', () => {
    const name = 'Test Name'
    cy.get('.ui.icon.left.labeled.button')
      .should('be.visible')
      .click()

    cy.get("input[placeholder='Account name']")
      .type(name)

    cy.get("input[name=usd]")
      .type(100)
    cy.get("input[name=eur]")
      .type(200)
    cy.get("input[name='Japanse yen']")
      .type(300)

    cy.get(".ui.fluid.primary.button")
      .click()

    cy.get(".account-widget-account__name").should('contain', name)
  })
})