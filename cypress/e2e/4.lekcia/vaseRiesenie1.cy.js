// Domaca uloha:
// Vytvorte metódu addRyan, ktorá klikne na tlačidlo pridať Ryana
// Upravte metódu tak aby príjmala vstupný parameter, číslo.
// Vstupný paramater definuje, koľko ryanov sa pridá na stránku

//tato funkcia generuje od 0, aj s 0
const number = Math.floor(Math.random() * 11)

function addHeadOfRyan(cislo) {
  cy.log("pridaj tolko hlav ake cislo sa vygenerovalo randomne")
  let i
  //doplnit podmienku
  for (i = 0; i < cislo; i++) {
    cy.get("#addRyan").click()
  }
  cy.log("skontroluje, či su img viditene")
  cy.get("img")
    .should("have.length", cislo)
    .each(($img) => {
      cy.wrap($img).should("be.visible")
    })
}

describe("vytvor metodu addRyan na stranke gosslingator", () => {
  it("pridaj addryan metodu", () => {
    cy.log("Navštiv stránku gosslingator")
    cy.visit("gosslingator.php")
    cy.log("zavolanie funkcie addHeadOfRyan")
    addHeadOfRyan(number)
  })
})
