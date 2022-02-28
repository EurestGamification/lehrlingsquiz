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

  it("breadTypes renders correctly", () => {
    cy.goto(0);
    cy.contains("Erkennen von Lebensmitteln");
  });

  it("vegetableTypes renders correctly", () => {
    cy.goto(1);
    cy.contains("Erkennen von Lebensmitteln");
  });

  it("resets quiz on cancel confirm", () => {
    cy.goto(1);
    cy.get("button.quiz__actions__cancel").click();
    cy.get("button.quiz__actions__cancel-confirm__y").click();
    cy.contains("Quiz starten");
  });

  // it("drag and drop works (tested on breadTypes)", () => {
  //   cy.goto(0);
  //   const gebäckDataTransfer = new DataTransfer();
  //   const gebäck = cy.get("span").contains("Gebäck").parent();
  //   cy.get("button").contains("Laugenstangerl").trigger("dragstart"),
  //     { dataTransfer: gebäckDataTransfer };
  //   gebäck.trigger("drop", { dataTransfer: gebäckDataTransfer });
  //   gebäck.should("contain.text", "Laugenstangerl");

  //   const schwarzbrotDataTransfer = new DataTransfer();
  //   const schwarzbrot = cy
  //     .get("span")
  //     .contains("Schwarzbrot")
  //     .parent();
  //   cy.get("button").contains("Vollkornbrot").trigger("dragstart"),
  //     { dataTransfer: schwarzbrotDataTransfer };
  //   schwarzbrot.trigger("drop", {
  //     dataTransfer: schwarzbrotDataTransfer
  //   });
  //   schwarzbrot.should("contain.text", "Vollkornbrot");

  //   const weißbrotDataTransfer = new DataTransfer();
  //   const weißbrot = cy.get("span").contains("Weißbrot").parent();
  //   cy.get("button").contains("Toastbrot").trigger("dragstart"),
  //     { dataTransfer: weißbrotDataTransfer };
  //   weißbrot.trigger("drop", { dataTransfer: weißbrotDataTransfer });
  //   weißbrot.should("contain.text", "Toastbrot");
  // });
});
