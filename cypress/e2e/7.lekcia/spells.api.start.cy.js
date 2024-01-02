/// <reference types="Cypress" />

describe('Spells API', () => {
  it('returns list of spells', () => {
    // get all spells
    // check that response body is an array
    // check array length
  })

  it('returns a specific spell', () => {
    // get one specific spell
    // check exact spell information (effect, type, isUnforgivable)

  })

  it('adds new spell', () => {
    // add one specific spell
    // HOMEWORK 0: check response after spell is created, extract ID and send a request to it, check that spell data are correct
    // HOMEWORK 1: open page, find spell by effect, open detail and check spell name
    // HOMEWORK 2: extract spell from request body to standalone JSON constant
  })
})