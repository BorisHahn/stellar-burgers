describe('template spec', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.seedAndVisit();

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken'),
    );
    cy.setLocalStorage('accessToken', 'test-accessToken');
  });
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get("[data-test='Краторная булка N-200i']").trigger('dragstart');
    cy.get("[data-test='drop-area']").trigger('drop');
    cy.get("[data-test='Краторная булка N-200i'] [data-test='counter']").should(
      'have.text',
      '2',
    );
    cy.get("[data-test='top-bun'] .constructor-element__text").should(
      'have.text',
      'Краторная булка N-200i (верх)',
    );
    cy.get("[data-test='bottom-bun'] .constructor-element__text").should(
      'have.text',
      'Краторная булка N-200i (низ)',
    );
    cy.get("[data-test='Биокотлета из марсианской Магнолии']").trigger(
      'dragstart',
    );
    cy.get("[data-test='drop-area']").trigger('drop');
    cy.get(
      "[data-test='Биокотлета из марсианской Магнолии'] [data-test='counter']",
    ).should('have.text', '1');
    cy.get("[data-test='button-createOrder']").click();
  });
});
