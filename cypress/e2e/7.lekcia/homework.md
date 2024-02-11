# Domáca úloha - Intercept

## Dokončite testy

Implementujte všetky TODO, ktoré sa nachádzajú [v tomto súbore](https://github.com/skarbala/TAS_5/blob/main/cypress/e2e/6.lekcia/intercept.finish.cy.js)

## Namockujte dáta v destination modal
Napíš nasledovný test

1. otvor stránku Kiwi.com
2. do inputu destination napíš Tokyo
3. odpoveď zo servera nahraď súborom places.json z fixtures foldera
4. over destináciu v modal okne

places.json súbor nájdeš [tu](https://github.com/skarbala/TAS_5/blob/main/cypress/fixtures/places.json)

## Potter API
Spusti si PotterAPI (frontend + backend)

### Spelleology

Napíš nasledovné testy

#### Overenie hlášky, ak mi príde prázdna odpoveď zo servera
1.  nahraď odpoveď z endpointu `/spells` tak aby mi vratilo prazdne pole
2. otvor stránku Spelleology 
3. over hlášku `Mischief managed`

#### Overenie vlastného kúzla
1. nahraď odpoveď zo servera vlastnou, kde budeš mať práve jedno kúzlo
2. otvor stránku Spelleology
3. klikni na názov kúzla
4. over detail kúzla
