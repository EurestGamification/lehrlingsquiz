// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { repeatAction } from "./helpers";
import { clickStartQuiz } from "./helpers/clickStartQuiz";

Cypress.Commands.add(
  "forceClick",
  { prevSubject: "element" },
  (subject, options) => {
    cy.wrap(subject).click({ force: true });
  }
);

Cypress.Commands.add("quizNext", () => {
  cy.get("button.next").contains("Weiter").click();
});

export enum QuizSection {
  introduction = "introduction",
  breadTypes = "breadTypes",
  vegetableTypes = "vegetableTypes",
  menuCourses = "menuCourses",
  schnitzelIngredients = "schnitzelIngredients",
  breadSchnitzel = "breadSchnitzel",
  schnitzelDone = "schnitzelDone",
  customerOrientation = "customerOrientation",
  companyEstimate1 = "companyEstimate1",
  companyEstimate2 = "companyEstimate2",
  companyEstimate3 = "companyEstimate3",
  results = "results"
}
export type QuizSectionType = `${QuizSection}`;

const links = {
  [QuizSection.introduction]: () => {
    cy.visit("/");
  },
  [QuizSection.breadTypes]: () => {
    clickStartQuiz();
  },
  [QuizSection.vegetableTypes]: () => {
    clickStartQuiz();
    cy.quizNext();
  },
  [QuizSection.menuCourses]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 2);
  },
  [QuizSection.schnitzelIngredients]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 3);
  },
  [QuizSection.breadSchnitzel]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 4);
  },
  [QuizSection.schnitzelDone]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 5);
  },
  [QuizSection.customerOrientation]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 6);
  },
  [QuizSection.companyEstimate1]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 7);
  },
  [QuizSection.companyEstimate2]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 7);
    cy.get("button").contains("Ca. 1.100 Mitarbeiter:innen").click();
    cy.quizNext();
  },
  [QuizSection.companyEstimate3]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 7);
    cy.get("button").contains("Ca. 1.100 Mitarbeiter:innen").click();
    cy.quizNext();
    cy.get("button")
      .contains("Durchschnittlich 30 Lehrlinge")
      .click();
    cy.quizNext();
  },
  [QuizSection.results]: () => {
    clickStartQuiz();
    repeatAction(cy.quizNext, 7);
    cy.get("button").contains("Ca. 1.100 Mitarbeiter:innen").click();
    cy.quizNext();
    cy.get("button")
      .contains("Durchschnittlich 30 Lehrlinge")
      .click();
    cy.quizNext();
    cy.get("button").contains("Ca. 60 Restaurants").click();
    cy.quizNext();
  }
};

Cypress.Commands.add("goto", (section: QuizSectionType) => {
  cy.visit("/");
  links[section]();
});
