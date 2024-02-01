let NumberClick = 3

function addRyan(numberClick) {
  if (numberClick > 0) {
    cy.log("Add Ryan button click")
    for (let i = 0; i < numberClick; i++) {
      cy.get("#addRyan").should("be.visible").and("contain", "Ryan!").click()
    }
    //sem patri tato validacia
    cy.log("Image length: " + NumberClick)
    cy.get("img").should("have.length", NumberClick)
  } else {
    cy.log("You entered nonsense, enter a positive number")
  }
}

describe("HW: Lekce 3", () => {
  beforeEach(() => {
    cy.log("Visit gosslingator webpage")
    cy.visit("gosslingator.php")
  })

  it("Přidej xkrát Ryana", () => {
    addRyan(NumberClick)
  })
})
