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
    const localStorage = cy.getAllLocalStorage().specWindow.localStorage

    if(localStorage.length === 0) {
        return false
    } else {
        if(itemID in localStorage) {
            return true
        } else {
            return false
        }
    }
})

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