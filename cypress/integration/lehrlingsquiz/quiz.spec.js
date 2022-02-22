/// <reference types="cypress" />

describe("Test Lehrlingsquiz", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("renders the intro page correctly", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("breadTypes renders correctly", () => {
    // cy.get("button").contains("Quiz starten").click();
    cy.goto(0);
    cy.contains("Erkennen von Lebensmitteln");
  });

  it("vegetableTypes renders correctly", () => {
    // cy.get("button").contains("Quiz starten").click();
    cy.goto(1);
    cy.contains("Erkennen von Lebensmitteln");
  });

  it("resets quiz on cancel confirm", () => {
    cy.goto(1);
    cy.get("button.quiz__actions__cancel").click();
    cy.get("button.quiz__actions__cancel-confirm__y").click();
    cy.contains("Quiz starten");
  });
});
