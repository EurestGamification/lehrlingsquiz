// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// load type definitions that come with Cypress module
/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import "./commands";
import { QuizSectionType } from "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Additional packages
import "cypress-hmr-restarter";

declare global {
  namespace Cypress {
    interface Chainable {
      goto(index: QuizSectionType): Chainable<Element>;
      forceClick(value: string): Chainable<Element>;
      quizNext(): Chainable<Element>;
    }
  }
}
