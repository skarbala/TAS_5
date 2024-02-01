// Domaca uloha:
// Vytvorte metódu addRyan, ktorá klikne na tlačidlo pridať Ryana
// Upravte metódu tak aby príjmala vstupný parameter, číslo.
// Vstupný paramater definuje, koľko ryanov sa pridá na stránku

function betterClickOnRyan(randomnumber) {
  for (let i = 0; i < randomnumber; i++) {
    cy.get("#addRyan").should("have.text", "Ryan!").click()
  }
}

describe("DU 3 lekcia", () => {
  beforeEach(() => {
    cy.log("Naloguj sa na stránku Gosslingator")
    cy.visit("gosslingator.php")
  })

  it("Zavolanie funkcie betterClickOnRyan", () => {
    const randomnumber = Math.floor(Math.random() * 10)
    cy.log("Vylosované číslo:" + randomnumber)
    cy.log("Nájdi btn Ryan! a klikni nan " + randomnumber + "x")

    betterClickOnRyan(randomnumber)

    //nezabudat na visible validacie s each cyklom
    cy.get("img").should("be.visible").and("have.length", randomnumber)

    cy.log("Chekni počet Ryan count" + randomnumber)
    cy.get("h2").should("be.visible").and("contain", randomnumber)

    cy.log("ulož hodnotu z h2")
    cy.get("h2").then(($text1) => {
      let textValue1 = $text1.text()
      cy.log("Počet klikov na Ryana je: " + textValue1)
      cy.log("Over či je h2 zobrazený so správnou hodnotou")
      cy.get("h2").should("be.visible").and("contain", randomnumber)
    })

    cy.get("h2")
      .invoke("text")
      .then((text1) => {
        cy.log("Novy počet klikov na Ryana je: " + text1)
        cy.log("Over či je h2 zobrazený so správnou hodnotou")
        //pridat validaciu alebo mozete pridat if
        if (text1 == randomnumber) {
          cy.get("h2").should("be.visible").and("contain", randomnumber)
          cy.log("pocet klikov a zobrazenie na stranke su rovne")
        } else {
          cy.log("nekliklo spravny pocet krat alebo h2 nevypisuje spravne")
        }
      })
  })
})
