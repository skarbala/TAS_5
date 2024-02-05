describe("Setup cookies and locale storage", () => {
  beforeEach(() => {
    cy.setCookiesAndLocalStorage()
    cy.log("Visit Kiwi webpage")
    cy.visit("https://www.kiwi.com/en/")
  });
  it("Test cookies on kiwi page", () => {
    cy.log("Cookies popup not exist")
    cy.get("[data-test=CookiesPopup]").should("not.exist")

    cy.log("Change language to CZ");
    cy.get("[data-test='TopNav-RegionalSettingsButton']").click()
    cy.get("[data-test='LanguageSelect']").select("cz")
    cy.get("[data-test='SubmitRegionalSettingsButton']").click()

    cy.log("Cookie has correct value")
    cy.getCookie("preferred_language").should("have.a.property", "value", "cz")
  });
});
