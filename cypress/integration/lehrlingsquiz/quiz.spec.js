/// <reference types="cypress" />

describe("Test Lehrlingsquiz", () => {
  beforeEach(() => {
    cy.visit("");
  });

  it("successfully loads", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("renders the intro page correctly", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("starts the quiz", () => {
    cy.get("button").contains("Quiz starten").click();
    cy.contains("Erkennen von Lebensmitteln");
  });
});
