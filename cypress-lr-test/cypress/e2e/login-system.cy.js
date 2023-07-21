describe('Login process with fake credentials', () => {
    before(() => {
        cy.visit("http://localhost:4200/login");

        // Stub your functions here using Cypress.on()
        cy.on('window:before:load', (win) => {
            cy.stub(win.console, 'log').as('consoleLog');
        });
    });

    it('tries logging in', () => {
        cy.get(".email").type("fakeemail@email.com");
        cy.get(".password").type("fakepassword123");
        cy.get(".logInWithEmail").click();
        cy.get('@consoleLog').should('be.calledWith', 'Firebase: Error (auth/user-not-found).')
    });
});

