import 'cypress-localstorage-commands';

Cypress.Commands.add('seedAndVisit', () => {
  cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
    fixture: 'ingredients',
  });
  cy.visit('http://localhost:3000/');
});
