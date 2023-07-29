describe("Login process", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:4200/login");
  });

  it("fake login credentials", () => {
    cy.get(".email").type("fakeemail@email.com");
    cy.get(".password").type("fakepassword123");
    cy.get(".logInWithEmail").click();
    cy.on("window:alert", (txt) => {
      expect(txt.message).to.contain("auth/user-not-found");
    });
  });

  it("real login credentials", () => {
    cy.get(".email").type("email@email.com");
    cy.get(".password").type("DujeziziC07@");
    cy.get(".logInWithEmail").click();
    cy.wait(200);
    cy.get(".text").contains("Edit");
  });
});
