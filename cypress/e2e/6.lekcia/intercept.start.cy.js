beforeEach(() => {
    cy.setCookiesAndLocalStorage()
});

describe('Wait for a response: Search & Result page', () => {

    it('TOGETHER: wait for a response on result page', () => {
        //TODO: doplnit intercept a cakanie na response pre zobrazenie vysledkov
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
        cy.wait(10000)
        cy.get('[data-test="ResultCardWrapper"]').should('be.visible')
    })

    it('SELF: repeat waiting for response at search page destination modal', () => {
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"]')
            .find('[data-test="SearchField-input"]')
            .type('Tokyo')
    })
})

describe('Replace a response and mock the state', () => {
    it('TOGETHER: return no results on result page', () => {
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
    });
    it('TOGETHER: return one place based on fake fixture', () => {
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        cy.get('[data-test="PlacepickerModalOpened-destination"]')
            .contains('Tokyo')
            .click()
        cy.get('[data-test="LandingSearchButton"]')
            .click()
    })
    it('SELF_WORK: return no places', () => {
        //TODO: doplnit intercept na vratenie prazdneho zoznamu miest
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"] > [data-test="SearchField-input"]')
            .type('Tokyo')
        //TODO: ++doplnte overenie
    })
})

describe('Check the network communication (request + response)', () => {
    it('TOGETHER: check outgoing request and response', () => {
        const user = {
            name: 'testaccount@furbo.sk',
            password: 'starterpack4'
        }
        cy.intercept('https://auth.skypicker.com/v1/user.exists').as('userExists')

        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="TopNav-SingInButton"]').click()
        cy.get('[data-test="MagicLogin-LoginViaEmail"]').click()
        cy.get('[data-test="MagicLogin-Email"]').type(user.name)
        cy.get('[data-test="MagicLogin-Continue"]').click()
        cy.wait('@userExists').then(interception => cy.log(interception))
        //TODO: doplnit overenie odchadzajuceho requestu

        cy.get('[data-test="MagicLogin-PasswordInput"]').type(user.password)
        cy.contains('button', 'Sign in').click()
    });
})