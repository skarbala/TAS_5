/// <reference types="Cypress" />
const backendBaseUrl = 'http://localhost:3000'
const frontendBaseUrl = 'http://localhost:8080'
beforeEach('reset spells', () => {
  cy.request(backendBaseUrl + '/spells/actions/reset')
})

describe('Spells API', () => {
  it('returns list of spells', () => {
    cy.request(backendBaseUrl + '/spells')
      .then(response => {
        const spells = response.body
        //over ze sa mi vratilo pole 
        expect(spells)
          .to.be.an('array')
          .and.have.length.greaterThan(0)

        spells.forEach(spell => {
          expect(spell.effect)
            .to.be.a('string')
        });
      })
  })

  it('returns a specific spell', () => {
    cy.request(backendBaseUrl + '/spells/5b74efe73228320021ab6251')
      .then(response => {
        expect(response.body.spell).to.equal('Deprimo')
      })
  })
  it('adds new spell', () => {
    const newSpell = {
      spell: 'Corona',
      type: 'Curse',
      effect: 'sneezing forever',
      isUnforgivable: true
    }
    cy.request(
      {
        method: 'POST',
        url: backendBaseUrl + '/spells',
        body: newSpell
      }).then(response => {
        expect(response.body.message).to.eq('Spell created')
        cy.request(backendBaseUrl + '/spells/' + response.body.spell.id)
          .then(response => expect(response.body.effect).to.eq(newSpell.effect))
      })

    cy.visit(frontendBaseUrl + '/#/spelleology')
    cy.contains('sneezing forever').click()
    cy.contains('Corona').should('be.visible')
  })
})