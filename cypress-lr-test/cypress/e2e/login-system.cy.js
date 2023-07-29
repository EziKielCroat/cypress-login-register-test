describe('Login process with fake credentials', () => {
    it('tries logging in', () => {
        cy.get(".email").type("fakeemail@email.com");
        cy.get(".password").type("fakepassword123");
        cy.get(".logInWithEmail").click();
        cy.get('@consoleLog').should('be.calledWith', 'Firebase: Error (auth/user-not-found).')
    });
});

