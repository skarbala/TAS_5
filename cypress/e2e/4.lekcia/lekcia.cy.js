const destination = "Tokyo"

Cypress._.times(10, () => {
  describe("testing of search form", () => {
    it("should test search form and btns", () => {
      //cy nespadne, lebo sme mu dodali celu URL, cize ignor base url v configu
      cy.visit("https://www.kiwi.com/en/")

      cy.log("accept cookies")
      cy.get("[data-test=CookiesPopup-Accept]").click()
      //tymto overim, ze element neexistuje uz ani v HTML
      cy.get("[data-test=CookiesPopup]").should("not.exist")

      cy.log("check that button is Explore")
      cy.contains("[data-test=LandingSearchButton]", "Explore").should(
        "be.visible"
      )

      cy.log("type destination")
      cy.get("[data-test=PlacePickerInput-destination]").type(destination)

      //dva druhy zapisu, oba su spravne
      //cy.get("[data-test=PlacePickerRow-wrapper]").contains("Tokyo").click()
      cy.contains("[data-test=PlacePickerRow-wrapper]", destination)
        .eq(0)
        .click()

      cy.log("destination is one and only")
      cy.get(
        "[data-test=SearchFieldItem-destination] [data-test=PlacePickerInputPlace]"
      )
        .should("have.length", 1)
        .and("be.visible")

      cy.log("check that button is Search")
      //validacia pre celu url v href
      cy.contains("[data-test=LandingSearchButton]", "Search")
        .should("be.visible")
        .and(
          "have.attr",
          "href",
          "/en/search/results/piestany-slovakia/tokyo-japan"
        )

      //toto overuje substring URL
      cy.contains("[data-test=LandingSearchButton]", "Search")
        .should("be.visible")
        .and("have.attr", "href")
        .and("include", "/en/search/results/")

      cy.log("check url")
      //na vylepsenie kodu: pohrajte sa s const
      cy.url().should("include", "?destination=tokyo-japan")
      cy.url().should("eq", "https://www.kiwi.com/en/?destination=tokyo-japan")

      cy.log("uncheck checkbox")
      //moznost pouzit click
      //cy.get("[data-test=bookingCheckbox]").click()
      //uncheck moznost

      //alias
      cy.get("[data-test=bookingCheckbox] input").as("checkbox")
      cy.get("@checkbox").uncheck({ force: true })
      cy.get("@checkbox").should("not.be.checked")

      cy.log("click on search")
      cy.get("[data-test=LandingSearchButton]").click()
    })
  })
})
