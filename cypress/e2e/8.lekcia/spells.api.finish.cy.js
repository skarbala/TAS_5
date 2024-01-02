/// <reference types="Cypress" />
const backendBaseUrl = 'http://localhost:3000'

it('Usage of JWT token: get all houses', () => {
    cy.request({
        url: backendBaseUrl + '/login',
        auth: {
            username: 'admin',
            password: 'supersecret'
        }
    }).then(response => {
        const token = response.body.token
        cy.request({
            url: backendBaseUrl + '/houses',
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(response => {
            expect(response.body).to.have.length(4)
            expect(response.body[0].name).to.eq('Gryffindor')
        })
    })
})