/*
Zautomatizuje tieto scenáre
   - over že po vytvorení sú vstupné polia prázdne
*/

describe("Homework - Calculator", () => {
  beforeEach(() => {
    cy.visit("/savingscalculator.php")
  })

  it("Validate empty input fields", () => {
    /* BUG */
    //za tymto sa nachadza logika prazdneho drop downu, preto null, nie empty string.
    cy.log("Dropdown should be empty")
    //obe riesenia su spravne
    cy.get("#fundSelect").invoke("val").should("eq", null)
    cy.get("#fundSelect").should("have.value", null)

    //extra validacia, ze preselectnuta je prva option s tymto nazvom
    cy.get("#fundSelect")
      .find("option")
      .first()
      .should("have.prop", "selected", true)
      .and("have.text", "Select your fund")

    // jeden druh zapisu
    cy.get("#oneTimeInvestmentInput").should("have.value", "")

    //druhy druh zapisu
    cy.get("#yearsInput").should("have.prop", "value", "") //cekuje property

    //treti druh zapisu
    cy.get("#emailInput").invoke("val").should("eq", "")

    /*
    // ak chcete overit uz vybranu polozku
    cy.get("#fundSelect option:selected")
      .should("have.value", 2)
      .and("have.text", "Hoggwart's Fund")
    */
  })
})
