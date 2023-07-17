
describe('The Home Page', () => {
    it('successfully loads', async () => {
      cy.visit('http://localhost:4200');
    })
})

describe('Checking user authorization', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200');
    })
    it('allowed user logs in', () => {
        cy.addItem("logIn", true);
        cy.visit('http://localhost:4200');
        cy.get(".text").contains("and save to reload.")
    })

    it('not allowed user logs in', () => {
        cy.removeItem("logIn");
        cy.visit('http://localhost:4200');
        cy.get(".notauthorized").contains("You are not a authorized user, you will be redirected to the login page.")
    })
})