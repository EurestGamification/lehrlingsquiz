/// <reference types="cypress" />

describe("Test Lehrlingsquiz", () => {
  beforeEach(() => {
    cy.visit(`http://localhost:3000`);
  });

  it("successfully loads", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("renders the intro page correctly", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });
});
