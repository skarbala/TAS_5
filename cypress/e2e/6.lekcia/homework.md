# Domáca úloha - Intercept

## Dokončite testy

Implementujte všetky TODO, ktoré sa nachádzajú [v tomto súbore](https://github.com/skarbala/TAS_5/blob/main/cypress/e2e/6.lekcia/intercept.finish.cy.js)

## Namockujte dáta v destination modal
Napíšte nasledovný test
```
1. otvorím stránku Kiwi.com
2. do inputu destination napíšem Tokyo
3. odpoveď zo servera nahradím súborom places.json z fixtures foldera
4. overím destináciu v modal okne
```

places.json súbor nájdete [tu](https://github.com/skarbala/TAS_5/blob/main/cypress/fixtures/places.json)

## Potter API
Spustite si PotterAPI (frontend + backend)

### Spelleology

Napíšte nasledovný testy

#### Overenie hlášky, ak mi príde prázdna odpoveď zo servera
1.  nahraď odpoveď z endpointu `/spells` tak aby mi vratilo prazdne pole
2. otvor stránku Spelleology 
3. over hlášku `Mischief managed`

#### Overenie vlastného kúzla
1. nahraď odpoveď zo servera vlastnou, kde budeš mať práve jedno kúzlo
2. otvor stránku Spelleology
3. klikni na názov kúzla
4. over detail kúzla
