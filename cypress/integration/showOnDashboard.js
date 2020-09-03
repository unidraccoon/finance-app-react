describe('Test show on dashboard', () => {
  beforeEach(() => {
    cy.visit('/accounts')
  })

  it('add account on dashboard', () => {
    const name = 'Test Dashboard'
    cy.get('.ui.icon.left.labeled.button')
      .should('be.visible')
      .click()

    cy.get("input[placeholder='Account name']")
      .type(name)

    cy.get("input[name=usd]")
      .type(10)

    cy.get("[type=checkbox]")
      .last()
      .check({force: true})

    cy.get(".ui.fluid.primary.button")
      .click()

    cy.visit('/')

    cy.get(".account-widget-account__name").should('contain', name)
  })
})