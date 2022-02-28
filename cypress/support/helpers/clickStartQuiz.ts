export const clickStartQuiz = () => {
  cy.get("button").contains("Quiz starten").click();
};
