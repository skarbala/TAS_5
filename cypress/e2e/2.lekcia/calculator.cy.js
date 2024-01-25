describe("Calculator test - investment", () => {
  beforeEach(() => {
    cy.visit("savingscalculator.php")
  })

  it("should test investment and calculation", () => {
    cy.log("select fund")
    cy.get("[id=fundSelect]").select("McDuck's safe")

    cy.log("type investment")
    cy.get("[id=oneTimeInvestmentInput]").type(5000)

    cy.log("type years")
    cy.get("#yearsInput").type(6)

    cy.log("click on calculate")
    //pro tip ako ohurit kolegu - iny zapis pre contains
    //cy.contains("button", "Calculate").click()

    cy.get("[data-test=calculate]").click()

    cy.log("check kr in Total Income")
    //css struktura
    cy.get("div .result p").eq(0).should("contain", "kr")

    //pro tip pre iny zapis - cypress struktura
    cy.get("div .result").find("p").eq(0).should("contain", "kr")

    //najidealnejsia struktura
    cy.contains("span", "Total income")
      .siblings("p")
      .should("contain", "kr")
      .and("be.visible")
  })

  it("Validate email in details", () => {
    cy.log("select fund")
    cy.get("[id=fundSelect]").select("McDuck's safe")

    cy.log("type investment")
    cy.get("[id=oneTimeInvestmentInput]").type(5000)

    cy.log("type years")
    cy.get("#yearsInput").type(6)

    cy.log("Insert email and apply for savings")
    cy.get("#emailInput").type("ahihi@hoho.com")
    cy.get("[data-test=apply-for-saving]").click()

    cy.log("click on detail and validate")
    //nezabudat na validacie
    cy.get("ul.saving-list li:eq(0)").should("be.visible").and("have.length", 1)
    cy.contains("button", "detail").click()

    cy.log("check mailis")
    //jedna moznost
    //nezabudat na validacie
    cy.get("div.modal-body").should("be.visible")
    cy.contains("p", "Contact")
      .children("span")
      .should("have.text", "ahihi@hoho.com")

    //tiez dobra moznost
    cy.contains("p", "Contact")
      .find("span")
      .should("have.text", "ahihi@hoho.com")
  })
})
