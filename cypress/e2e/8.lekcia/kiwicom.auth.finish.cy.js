it('API: get token from API call and open page as logged in user', () => {
    cy.request({
        method: 'POST',
        url: 'https://auth.skypicker.com/v1/user.login',
        body: {
            login: user.name,
            password: user.password,
            brand: "kiwicom"
        },
        headers: {
            "Authorization": "Basic NTQzM2VjY2NhZmY2Nzo="
        }
    }).then(response => { cy.setCookie('ua_session_token', response.body.token) })

    cy.visit('https://www.kiwi.com/user/?tab=price-alerts')
    cy.get('[data-test="NoPriceAlerts"]')
        .should('contain.text', "You haven't set up any price alerts")
    cy.get('[data-test="StartExploringButton"]').click()
    cy.url().should('eq', 'https://www.kiwi.com/en/')
})