describe('Test edit account', () => {
  beforeEach(() => {
    cy.visit('/accounts')
  })

  it('edit account name', () => {
    const name = 'Edit Name'
    cy.get('.ui.basic.circular.icon.button')
      .first()
      .should('be.visible')
      .click()

    cy.get("input[placeholder='Account name']")
      .clear()
      .type(name)

    cy.get(".ui.fluid.primary.button")
      .click()

    cy.get(".account-widget-account__name").first().contains(name)

  })
})