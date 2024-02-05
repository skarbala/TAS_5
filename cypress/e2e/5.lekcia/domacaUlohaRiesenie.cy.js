/* Domaca uloha
1. Napíšte nasledovný automatický test 
2. otvorím stránku Kiwi.com
3. zmením menu na Nórske koruny
4. vyhľadám let do Osla
5. overíte že mena sa správne zobrazí
*/

describe("Domaca uloha", () => {
  const destination = "Oslo"
  before(() => {
    cy.log("otvorím stránku Kiwi.com")
    cy.visit("https://www.kiwi.com/en/")
  });

  it("Zmením menu na Nórske koruny a overím na search results", () => {
    cy.log("Accepting all cookies.")
    cy.get("[data-test='CookiesPopup-Accept']")
      .should("have.text", "Accept")
      .click()

    cy.log("Checking cookies popup is not visible")
    cy.get("[data-test=CookiesPopup]").should("not.exist")

    cy.log("Uncheck booking checkbox")
    cy.get("[data-test=bookingCheckbox] input").as("checkbox")
    cy.get("@checkbox").uncheck({ force: true })
    cy.get("@checkbox").should("not.be.checked")

    cy.log("Click on regional settings button");
    cy.get("[data-test='TopNav-RegionalSettingsButton']").click()

    cy.log("Selecting currency - drop down menu");
    cy.get("[data-test='CurrencySelect']").select("nok")

    cy.log("Submit regional settings")
    cy.get("[data-test='SubmitRegionalSettingsButton']").click()

    cy.log("NOK currency should be visible in navbar")
    cy.contains("[data-test=TopNav-RegionalSettingsButton]", "NOK").should(
      "be.visible",
    );

    cy.log("Type Oslo to destination field")
    cy.get(
      "[data-test='PlacePickerInput-destination'] [data-test='SearchField-input']",
    ).type(destination)

    cy.log("Select first option")
    cy.contains("[data-test=PlacePickerRow-wrapper]", destination)
      .eq(0)
      .click()

    cy.log("Click search button")
    cy.get("[data-test='LandingSearchButton']").click()

    cy.log("Assert kr currency")
    cy.get("[data-test='ResultCardPrice']", { timeout: 10000 }).each(
      (price) => {
        cy.wrap(price).should("be.visible").and("contain", "kr")
      },
    );
  });
});
