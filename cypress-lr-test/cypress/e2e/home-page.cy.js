
describe('The Home Page', () => {
    it('successfully loads', async () => {
      cy.visit('http://localhost:4200');
    })
})

describe('Checking user authorization', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.visit('http://localhost:4200');
    })
    it('allowed user logs in', () => {
        cy.addItem("logIn", true);
        cy.get(".text").contains("and save to reload.")
    })

    it('not allowed user logs in', () => {
        cy.removeItem("logIn");
        cy.get(".notauthorized").contains("You are not a authorized user, you will be redirected to the login page.")
    })
})