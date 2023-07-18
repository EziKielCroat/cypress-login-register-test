// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-localstorage-commands'

Cypress.Commands.add('checkItem', (itemID) => {
    return cy.getAllLocalStorage().then(localStorage => {
      if (localStorage.length === 0) {
        return false;
      } else {
        return itemID in localStorage;
      }
    });
  });

Cypress.Commands.add('addItem', (itemID, itemValue) => {
    if(itemID !== "" && itemValue !== "") {
        cy.setLocalStorage(itemID, itemValue)
    }
})

Cypress.Commands.add('removeItem', (itemID) => {
    if(itemID !== "") {
        cy.removeLocalStorage(itemID)
    } else {
        new Error("Invalid ItemID")
    }
})

Cypress.Commands.add('setItem', (itemID, itemValue) => {
    if(itemID !== "" && itemValue !== "") {
        cy.setLocalStorage(itemID, itemValue)
    } else {
        new Error("Invalid ItemID or itemValue")
    }
})

Cypress.Commands.add('clearLocalstorage', (snapshotName) => {
    if(typeof snapshotName === 'undefined') {
        cy.clearLocalStorageSnapshot()
        return;
    }
    cy.clearLocalStorageSnapshot(snapshotName)
})