/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('Stacktribution app', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays title and subtitle', () => {
    cy.get('header h1').should('have.text', 'Stacktribution');
    cy.get('header h2').should(
      'have.text',
      "A tiny webapp to generate proper attribution to a Stack Overflow's answer."
    );
  });
});
