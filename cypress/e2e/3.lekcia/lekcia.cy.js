var randomEmail = require("random-email")
/*
//CD-R
const mail = "ahihi@hoho.com"
const investment = 2000
const yearsOfinvestment = 5 //camel case
//snake years_of_investment
const fund = "McDuck's safe"
*/

const savingInfo = {
  mail: randomEmail({ domain: "alza.sk" }),
  investment: 2000,
  yearsOfinvestment: 5,
  fund: "McDuck's safe",
}

function fillInInformation(fond, penizky, rociky, mailik = null) {
  cy.log("select fund")
  cy.get("[id=fundSelect]").select(fond)

  cy.log("type investment")
  cy.get("[id=oneTimeInvestmentInput]").type(penizky)

  cy.log("type years")
  cy.get("#yearsInput").type(rociky)

  if (mailik != null) {
    cy.log("toto sa zobrazi len, ked mail nebude null")
    cy.log("Insert email and apply for savings")
    cy.get("#emailInput").type(mailik)
  }
}

describe("Calculator test - investment", () => {
  beforeEach(() => {
    cy.visit("savingscalculator.php")
    //mozete to menit aj tu
    //investment = 50000000
  })

  it("should test investment and calculation", () => {
    fillInInformation(
      savingInfo.fund,
      savingInfo.investment,
      savingInfo.yearsOfinvestment
    )

    cy.log("click on calculate")
    cy.get("[data-test=calculate]").click()

    cy.log("check kr in Total Income")
    cy.get("div .result p").eq(0).should("contain", "kr")

    cy.get("div .result").find("p").eq(0).should("contain", "kr")

    cy.contains("span", "Total income")
      .siblings("p")
      .should("contain", "kr")
      .and("be.visible")
  })

  it.only("Validate email in details", () => {
    // CD-RW
    /*   let mail2 = "toto je druhy mail"
    cy.log(mail2) */

    fillInInformation(
      savingInfo.fund,
      savingInfo.investment,
      savingInfo.yearsOfinvestment,
      savingInfo.mail
    )

    cy.get("[data-test=apply-for-saving]").click()

    cy.log("click on detail and validate")
    cy.get("ul.saving-list li:eq(0)").should("be.visible").and("have.length", 1)
    cy.contains("button", "detail").click()

    cy.log("check mailis")
    cy.get("div.modal-body").should("be.visible")
    cy.contains("p", "Contact")
      .children("span")
      .should("have.text", savingInfo.mail)
  })
})
