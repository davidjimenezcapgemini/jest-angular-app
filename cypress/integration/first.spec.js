describe("Main functionalities", () => {
  let baseUrl = Cypress.config("baseUrl");
  beforeEach(() => {
    cy.visit(`${baseUrl}/login`);
  })
  
  it("Login success and navigate to dashboard page", () => {
    cy.get("[formControlName=username").type(Cypress.config("username"));
    cy.get("[formControlName=password").type(Cypress.config("password"));
    cy.get(".submit-button").click();
    setTimeout(() => {
      const url = cy.url();
      expect(url).toEqual(`${baseUrl}/dashboard`);
    }, 3000);
  });

});
