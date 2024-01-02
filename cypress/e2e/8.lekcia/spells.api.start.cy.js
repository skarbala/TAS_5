/// <reference types="Cypress" />
const backendBaseUrl = 'http://localhost:3000'
//Potter API documentation https://documenter.getpostman.com/view/6199862/SzYewFs9#1a29699c-be80-40f2-a355-9ad03cc34d77
it('Usage of JWT token: get all houses', () => {
    cy.request(backendBaseUrl + '/houses').then(response => {
        expect(response.body).to.have.length(4)
        expect(response.body[0].name).to.eq('Gryffindor')
    })

})