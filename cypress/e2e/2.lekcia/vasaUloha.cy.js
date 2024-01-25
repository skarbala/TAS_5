/* 
        Úloha: 
        1. Overit RYAN OUT button je vypnutý by default
        2. Kliknut dva krat na ryan button (pridat dvoch ryanov) a overit, že ryan out button nie je vypnutý
*/

describe("Testing webpage:Gosslingator", () => {
  beforeEach(() => {
    cy.log("Visit webpage")
    cy.visit("/gosslingator.php")
  })

  //úloha-->
  it.only("Test Ryan-out button", () => {
    cy.log("Nájde #removeRyan tlačítko a zkontroluje, či sa naň dá kliknúť.")
    //vyborne pouzitie visibility checku.
    //cypress vykonava validaciu visibility pred kazdou INTERAKCIOU
    cy.get("#removeRyan").should("be.disabled").and("be.visible")

    //automation pravidlo: vzdy validujte po interakcii, ci sa na stranke nieco zmenilo
    cy.log("Dvakrát klikne na #addRyan tlačítko")
    cy.get("#addRyan").click()
    cy.get("img").should("be.visible")
    cy.get("#addRyan").click()

    //ako overit kazdy element pomocou each()
    cy.get("img")
      .should("have.length", 2)
      .each(($img) => {
        cy.wrap($img).should("be.visible")
      })

    cy.log("Kontrola, či tlačítko #removeRyan funguje a či je viditelné")
    cy.get("#removeRyan").should("not.be.disabled").and("be.visible")
  })

  it("Homework", () => {
    cy.log("Ryanout button is off")
    cy.get("#removeRyan").should("be.disabled").and("be.visible")

    cy.log("Ryanout button is working")
    //automation pravidlo: nechainovat interakcie kvoli bezpecnosti
    cy.get("#addRyan").click()
    cy.get("#addRyan").click()
    cy.get("#ryanCounter").should("have.text", 2).and("be.visible")

    cy.log("Ryanout button is activated")
    cy.get("#removeRyan").should("not.be.disabled").and("be.visible")
  })

  it("Check RemoveRyan homework 1", () => {
    cy.get("h1").should("be.visible").and("have.text", "Goslingate me")
    cy.log("Remove Ryan button is default disabled and click to available")
    cy.get("#removeRyan").should("be.disabled")

    cy.get("#addRyan").should("be.visible").and("contain", "Ryan!").dblclick()

    cy.get("#ryanCounter").should("have.text", "2").and("be.visible")
    cy.get("#removeRyan").should("not.be.disabled")
  })
})
