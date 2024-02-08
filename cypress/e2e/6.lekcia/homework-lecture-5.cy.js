/// <reference types="cypress" />
beforeEach(() => {

})
it.only('save consent into cookie', () => {
    cy.visit('https://www.kiwi.com/en')
    cy.contains('button', 'Accept').click()
    waitForCookie('__kwc_agreed')
        .should('exist')
        .and('have.a.property', 'value', 'true')

    //refresh stranky kde overime ze cookies popup sa po spravnom ulozeni nezobrazi
    //  cy.reload()
    //cy.get('[data-test="CookiesPopup-Accept"]').should('not.exist')
});

it('save preferred language into cookie', () => {
    cy.setCookiesAndLocalStorage()
    cy.visit('https://www.kiwi.com/en')
    cy.get('[data-test="TopNav-RegionalSettingsButton"]').click()
    cy.get('[data-test="CurrencySelect"]').select('nok')
    cy.get('[data-test="SubmitRegionalSettingsButton"]').click()

    cy.getCookie('preferred_currency').should('have.a.property', 'value', 'nok')
});

function waitForCookie(cookieName, currentAttempt = 1) {
    const maxAttempts = 10
    if (currentAttempt > maxAttempts) {
        throw new Error(`Maximum attempts (${maxAttempts}) reached. Cookie not found.`);
    }

    return cy.getCookie(cookieName).then(cookie => {
        if (cookie == null) {
            cy.wait(100);
            return waitForCookie(currentAttempt + 1);
        }
        return cy.wrap(cookie);
    });
}