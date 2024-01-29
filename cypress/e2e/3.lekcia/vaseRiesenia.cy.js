describe("Test: Saving calculator webpage", () => {
  before(() => {
    cy.log("Vždy proběhne jednou")
  })
  beforeEach(() => {
    cy.log("Vždy proběhne jednou v každém IT bloku")
    cy.log("Visit SavingCalculator webpage")
    cy.visit("/savingscalculator.php")
  })

  //1. riesenie
  it("check empty fields", () => {
    //toto nam realne netestuje nic
    cy.get("#fundSelect").should("not.be.disabled")
    cy.get("[id=oneTimeInvestmentInput]").type(22)

    //validacia sa pouziva iba pre inner texts elementov
    cy.get("[id=oneTimeInvestmentInput]").should("be.empty")
    //spravne pouzitie vyzera nasledovne
    //cy.get("h1").should("be.empty")

    // ak si nie ste isti, pouzite reverzny testing
    cy.get("#yearsInput").should("have.value", "")
    cy.get('input[type="email"]').should("have.text", "")
  })

  //2. riesenie
  it("check empty fields", () => {
    cy.get("[id=fundSelect]")
      .should("contain", "Select your fund") //nedostatocna
      .and("be.visible")
      .children("option")
      .eq(0)
      .invoke("val")
      .should("be.empty")

    // 1. selected a potom overit text option
    cy.get("#fundSelect")
      .find("option")
      .first()
      .should("have.prop", "selected", true)
      .and("have.text", "Select your fund")

    cy.get("#oneTimeInvestmentInput")
      .should("be.visible")
      .invoke("val")
      .should("be.empty")

    cy.get("#emailInput").should("be.visible").and("have.value", "")
    cy.get("#emailInput").should("be.visible").and("have.value", "")
  })

  //3. riesenie
  it.only("Validate email in details + HW automatic deleted values - SAMOSTATNE 2.LEKCE", () => {
    cy.log("select the fund")
    cy.get("#fundSelect").should("have.value", null) //kontrola pro domácí ukol
    cy.get("#fundSelect")
      .select("Hoggwart's Fund")
      .should("have.value", "2")
      .should("be.visible")
    cy.get("#fundSelect").should("have.value", "2") //kontrola pro domácí ukol

    cy.log("Type amount of money")
    cy.get("#oneTimeInvestmentInput").should("have.value", "") //kontrola pro domácí ukol
    cy.get("#oneTimeInvestmentInput").should("be.visible").type(10000)
    cy.get("#oneTimeInvestmentInput").should("have.value", "10000") //kontrola pro domácí ukol

    cy.log("Type period in years")
    cy.get("#yearsInput").should("have.value", "") //kontrola pro domácí ukol
    cy.get("#yearsInput").should("be.visible").type(5)
    cy.get("#yearsInput").should("have.value", "5") //kontrola pro domácí ukol

    cy.log("Insert email and apply for savings")
    cy.get("#emailInput").should("have.value", "") //kontrola pro domácí ukol
    cy.get("#emailInput").should("be.visible").type("marek@test.cz")
    cy.get("#emailInput").should("have.value", "marek@test.cz") //kontrola pro domácí ukol

    cy.log("click on detail and validate")
    cy.get('[data-test="apply-for-saving"]')
      .should("not.be.disabled")
      .and("be.visible")
    cy.get('[data-test="apply-for-saving"]').click()

    cy.log("kontrola zobrazeni vysledku a vyvolání modálního okna")
    cy.get(".saving-detail").should("exist").and("be.visible") //mnou zadany assert
    cy.get("ul.saving-list li:eq(0)").should("be.visible").and("have.length", 1) //assert od lektorky

    cy.get(".saving-detail .fund-description").should(
      "have.text",
      "Hoggwart's Fund"
    ) //assert můj
    cy.get(".saving-detail .saving-detail").click() //mnou zadany klik
    //cy.contains("button", "detail").click() //pod lektorky

    cy.log("kontrola emailu v modalu")
    cy.get(".modal-body").should("be.visible")
    cy.get(".modal-body").contains("span", "marek@test.cz").should("exist") //mnou zadany assert

    cy.contains("p", "Contact")
      .children("span")
      .should("have.text", "marek@test.cz") //od lektorky
    cy.contains("p", "Contact")
      .find("span")
      .should("have.text", "marek@test.cz") //od lektorky

    cy.contains("button", "Close").click()

    cy.log("Dokončení HW z 2.lekce - inputfieldy již nemají vyplněné hodnoty")
    cy.get("#oneTimeInvestmentInput").should("have.value", "")
    cy.get("#yearsInput").should("have.value", "")
    cy.get("#emailInput").should("have.value", "")
    //tu je bug a tento riadok to odchytava
    //cy.get("#fundSelect").should("have.value", null) //nechal jsem jako posledni, protoze to padne na chybe, zustane vybrany fund

    //toto je validacia iba v pripade, ze tam nie je bug
    cy.get("#fundSelect option:selected")
      .should("have.value", 2)
      .and("have.text", "Hoggwart's Fund")
  })
})
