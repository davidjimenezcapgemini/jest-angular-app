
describe("Main functionalities", () => {
  let baseUrl = Cypress.config("baseUrl");
  
  it("Login success and navigate to dashboard page", () => {
    cy.visit(`${baseUrl}/login`);
    cy.get("[formControlName=username").type(Cypress.config("username"));
    cy.get("[formControlName=password").type(Cypress.config("password"));
    cy.get(".submit-button").click();
    cy.wait(3000);
    cy.url().then(url => assert.equal(url, `${baseUrl}/dashboard`));
  });

  it("Should shows all users on dashboard page", () => {
    cy.get('.card-container').then(cards => assert.equal(cards.length, 10))
  });

  it("Should deletes five users from the list", () => {
    cy.get('.card-container').then(cards => {
      for (const [key] of Object.entries(cards)) {
        if (key < 5) {
          cards[key].click();
        }
      }
      cy.get('i[name=delete-icon]').click();
      cy.get('.card-container').then(cards => assert.equal(cards.length, 5))
    });
  });

});
