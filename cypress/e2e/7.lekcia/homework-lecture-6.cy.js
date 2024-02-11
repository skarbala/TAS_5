describe('Homework Kiwi', () => {
    beforeEach(() => {
        cy.setCookiesAndLocalStorage()
    });
    it('returns mocked locations in destination modal', () => {
        cy.visit('https://www.kiwi.com')
        cy.intercept('**featureName=UmbrellaPlacesQuery**', { fixture: 'places.json' })
            .as('places')
        cy.visit('https://www.kiwi.com/en/')
        cy.get('[data-test="PlacePickerInput-destination"]')
            .find('[data-test="SearchField-input"]')
            .type('Tokyo')
        cy.wait('@places')
        cy.get('[data-test="PlacePickerRow-city"]')
        cy.get("[data-test=PlacepickerModalOpened-destination]", { timeout: 10000 }).should("contain", "Krompachy")
    })
});

describe('Homework PotterAPI', () => {
    it('display Mischief managed when no spells are shown', () => {
        cy.intercept('GET', "**/spells", []).as("spells")
        cy.visit("http://localhost:8080/#/spelleology")
        cy.wait("@spells")
        cy.contains("h1", "Mischief managed").should("be.visible")
    })

    it.only("shows only one fake spell", () => {
        const fakeSpell = {
            id: "1234",
            spell: "Friendly fire",
            type: "Curse",
            effect: "kill all your fellow counter-terrorists",
            isUnforgivable: false
        }
        cy.intercept("**/spells", [fakeSpell]).as("oneSpellIsEnough")
        cy.visit("http://localhost:8080/#/spelleology")
        cy.wait("@oneSpellIsEnough")
        cy.contains("li", fakeSpell.effect).click()
        cy.get('.modal-container').should('be.visible').within(() => {
            cy.contains("h2", fakeSpell.spell).should("be.visible")
            cy.contains("h3", fakeSpell.effect).should("be.visible")
        })
    })
});