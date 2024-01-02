
describe('Cypress session', () => {
    beforeEach('set cookie consent', () => {
        cy.setCookie('__kwc_agreed', 'true')
    })

    const user = {
        name: 'testaccount@furbo.sk',
        password: 'starterpack4'
    }

    it('UI: user with no price alert is navigated to search page', () => {
        cy.intercept('https://auth.skypicker.com/v1/user.login').as('login')
        cy.intercept('https://plexus-prod.skypicker.com/graphql').as('plexus')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="TopNav-SingInButton"]').click()
        cy.get('[data-test="MagicLogin-LoginViaEmail"]').click()
        cy.get('[data-test="MagicLogin-Email"]').type(user.name)
        cy.get('[data-test="MagicLogin-Continue"]').click()
        cy.get('[data-test="MagicLogin-PasswordInput"]').type(user.password)
        cy.contains('button', 'Sign in').click()
        cy.wait('@login').wait('@plexus')

        cy.visit('https://www.kiwi.com/user/?tab=price-alerts')
        cy.get('[data-test="NoPriceAlerts"]')
            .should('contain.text', "You haven't set up any price alerts")

        cy.get('[data-test="StartExploringButton"]').click()
        cy.url().should('eq', 'https://www.kiwi.com/en/')
    })

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

})