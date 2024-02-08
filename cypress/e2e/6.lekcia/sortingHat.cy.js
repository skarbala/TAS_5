it('displays custom message and custom house', () => {
    const fakeResponse = {
        "sortingHatSays": "Lorem ipsum fweoifwefewjfowejfiwoejfiewojfweiofjwoifwejofiwejfiwjeofiwjefiowejf",
        "house": "TAS"
    }
    cy.intercept('GET', '**/sortingHat', fakeResponse).as('hatWisdom')
    cy.visit('http://localhost:8080/#/sortingHat')
    cy.get('[data-test="sort-button"]').click()
    cy.wait('@hatWisdom')
})