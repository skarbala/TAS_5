/// <reference types="cypress" />

it('save consent into cookie', () => {
    cy.visit('https://www.kiwi.com/en')
    cy.contains('button', 'Accept').click()
    //Overenie 1.sposob
    cy.getCookie('__kwc_agreed').then(cookie => expect(cookie.value).to.eq('true'))

    //Overenie 2.sposob
    cy.getCookie('__kwc_agreed').should('have.a.property', 'value', 'true')

    //refresh stranky kde overime ze cookies popup sa po spravnom ulozeni nezobrazi
    cy.reload()
    cy.get('[data-test="CookiesPopup-Accept"]').should('not.exist')
});

it('save preferred language into cookie', () => {
    cy.setCookiesAndLocalStorage()
    cy.visit('https://www.kiwi.com/en')
    cy.get('[data-test="TopNav-RegionalSettingsButton"]').click()
    cy.get('[data-test="CurrencySelect"]').select('nok')
    cy.get('[data-test="SubmitRegionalSettingsButton"]').click()

    cy.getCookie('preferred_currency').should('have.a.property', 'value', 'nok')

});