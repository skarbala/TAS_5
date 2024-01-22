/*
Notes:
- otvorenie cypressu: npx cypress open
- testovaná stránka: https://furbo.sk/waw/gosslingator.php

Dokumentácia:
- cy.visit -> https://docs.cypress.io/api/commands/visit
- cy.get -> https://docs.cypress.io/api/commands/get
- cy.click -> https://docs.cypress.io/api/commands/click
- cy.contains -> https://docs.cypress.io/api/commands/contains
- should -> https://docs.cypress.io/api/commands/should
- knižnice, ktoré Cypress používa -> https://docs.cypress.io/guides/references/bundled-libraries
- config -> https://docs.cypress.io/guides/references/configuration
- api -> https://docs.cypress.io/api/table-of-contents

CSS selektory: https://flukeout.github.io/
*/

describe("Test: Gosslingator webpage", () => {
  before(() => {
    cy.log("Run only once")
  })

  beforeEach(() => {
    cy.log("Visit gosslingator webpage")
    cy.visit("/waw/gosslingator.php")
  })

  it("Add 1 Ryan", () => {
    cy.log("Add Ryan button is visible and contain correct text + click")
    cy.get("#addRyan").should("be.visible").and("contain", "Ryan!").click()
    // cy.get(".ryan-button")

    cy.log("Image length: 1")
    cy.get("img").should("have.length", 1)

    cy.log("Counter is visible and has correct text")
    cy.get("#ryanCounter").should("have.text", "1").and("be.visible")
    cy.get("h3").should("have.text", "ryan")
  })

  it("Test h1, ryan out button and add two ryans", () => {
    cy.get("h1").should("be.visible").and("have.text", "Goslingate me")
    // cy.contains("h1", "GOSLINGATE ME", { matchCase: false }).should("be.visible") --> ak nie je dôležité uppercase a lowercase

    /* 
        Úloha: 
        1. Overit RYAM OUT button je vypnutý by default
        2. Kliknut dva krat na ryan button (pridat dvoch ryanov) a overit, že ryan out button nie je vypnutý
    */
  })
})
