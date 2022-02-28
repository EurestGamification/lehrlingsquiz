/// <reference types="cypress" />
import "@4tw/cypress-drag-drop";

describe("Lehrlingsquiz", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("successfully loads", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("renders the intro page correctly", () => {
    cy.get("h1.header__title").should("have.text", "Lehrlingsquiz");
  });

  it("renders breadTypes correctly", () => {
    cy.goto("breadTypes");
    cy.contains(
      "Sortiere die verschiedenen Brote zu den richtigen Brotsorten. Du kannst die Brote einfach in den passenden Brotkorb ziehen."
    );
  });

  it("renders vegetableTypes correctly", () => {
    cy.goto("vegetableTypes");
    cy.contains(
      "Als Koch:Köchin arbeitet man täglich mit frischem Gemüse. Erkennst du die verschiedenen Gemüsesorten? Ziehe die Bezeichnung zu dem richtigen Gemüse."
    );
  });

  it("renders menuCourses correctly", () => {
    cy.goto("menuCourses");
    cy.contains(
      "Als Koch:Köchin ist es natürlich auch wichtig, die richtige Abfolge eines Menüs zu kennen, damit du weißt, wann welches Gericht an der Reihe ist. Ziehe die einzelnen Menübestandteile in die richtige Reihenfolge."
    );
  });

  it("renders schnitzelIngredients correctly", () => {
    cy.goto("schnitzelIngredients");
    cy.contains(
      "Super, und jetzt bereiten wir unsere Hauptspeise zu – heute gibt es ein Wiener Schnitzel!"
    );
  });

  it("renders breadSchnitzel correctly", () => {
    cy.goto("breadSchnitzel");
    cy.contains(
      "Was darf bei der Zubereitung eines leckeren Schnitzels nicht fehlen? Richtig! Natürlich das Panieren unseres Schnitzels!"
    );
  });

  it("renders schnitzelDone correctly", () => {
    cy.goto("schnitzelDone");
    cy.contains("Geschafft! Das hast du dir jetzt redlich verdient!");
  });

  it("renders customerOrientation correctly", () => {
    cy.goto("customerOrientation");
    cy.contains(
      "Bei uns in der Lehre zum:zur Koch:Köchin bist du auch in der Essensausgabe eingeteilt."
    );
  });

  it("renders companyEstimate correctly (question 1)", () => {
    cy.goto("companyEstimate1");
    cy.contains(
      "Was denkst du, wie viele Mitarbeiter:innen beschäftigt Eurest in ganz Österreich?"
    );
  });

  it("renders companyEstimate correctly (question 2)", () => {
    cy.goto("companyEstimate2");
    cy.contains(
      "Schätze mal - wie biele Lehrlinge bildet Eurest jedes Jahr im Durchschnitt insgesamt aus?"
    );
  });

  it("renders companyEstimate correctly (question 3)", () => {
    cy.goto("companyEstimate3");
    cy.contains(
      "Wie viele Restaurants betreiben wir deiner Einschätzung nach in ganz Österreich?"
    );
  });

  it("renders results correctly", () => {
    cy.goto("results");
    cy.contains("Resultat");
  });

  it("resets quiz on cancel confirm", () => {
    cy.goto("breadTypes");
    cy.get("button.quiz__actions__cancel").click();
    cy.get("button.quiz__actions__cancel-confirm__y").click();
    cy.contains("Quiz starten");
  });
});
