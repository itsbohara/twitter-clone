describe("Navigation", () => {
  it("should navigate to the register page", () => {
    // Start from the index page
    cy.visit("/");

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="/auth/register/"]').click();

    // The new url should include "/auth"
    cy.url().should("include", "/auth");

    // The auth page should contain an h6 with "Create your account"
    cy.get("h6").contains("Create your account");
  });
});
