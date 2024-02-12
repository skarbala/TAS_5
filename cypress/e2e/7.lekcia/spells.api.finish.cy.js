/// <reference types="Cypress" />
// PotterAPI documentation https://documenter.getpostman.com/view/6199862/SzYewFs9

describe('Spells API', () => {

  it('returns list of spells', () => {
    cy.request('http://localhost:3000/spells').then(response => {
      cy.log(response.body)
      expect(response.body).to.have.length(151)
      response.body.forEach(element => {
        expect(element.effect).not.to.be.empty
      });
    })
  })

  it('returns a specific spell', () => {
    cy.request('http://localhost:3000/spells/5b74ede13228320021ab6236').then(response => {
      expect(response.body.spell).not.to.be.empty
      expect(response.body.effect).to.equal('shoots water from wand')
    })
  })

  it.only('adds new spell', () => {
    cy.request('http://localhost:3000/spells/actions/reset')
    const newSpell = {
      spell: "Soplik",
      effect: "sneezing forever",
      type: "Curse",
      isUnforgivable: true
    }
    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/spells',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newSpell
    })
    cy.visit('http://localhost:8080/#/spelleology')
    cy.contains(newSpell.effect).click()
  })
})