it('API: get token from API call and open page as logged in user', () => {
    // send a request to login endpoint
    // get the login token
    //store token as session variable

    cy.visit('https://www.kiwi.com/user/?tab=price-alerts')
    cy.get('[data-test="NoPriceAlerts"]')
        .should('contain.text', "You haven't set up any price alerts")
    cy.get('[data-test="StartExploringButton"]').click()
    cy.url().should('eq', 'https://www.kiwi.com/en/')
})