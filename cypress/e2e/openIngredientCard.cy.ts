describe('template spec', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
      fixture: 'user.json',
    });
    cy.seedAndVisit();

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken'),
    );
    cy.setLocalStorage('accessToken', 'test-accessToken');
  });
  it('passes', () => {
    cy.visit('http://localhost:3000/');
    cy.get("[data-test='Краторная булка N-200i']").click();

    cy.get("[data-test='card-name']").should(
      'have.text',
      'Краторная булка N-200i',
    );
    cy.get("[data-test='modal-header'] > svg").click();
    cy.get("[data-test='ingredients-title']").should(
      'have.text',
      'Соберите бургер',
    );
  });
});
