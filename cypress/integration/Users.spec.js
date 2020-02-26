describe('Users list', () => {
  it('Open users page and renders correct length', () => {
    cy.visit('/users');
    cy.server();
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users',
      'fixture:users.json'
    );

    cy.get('[data-testid="user-list-item"]').should('have.length', 10);
  });

  it('Should change route if click one of user', async () => {
    cy.get('[data-testid="user-list-item"]').first().click();
    cy.window().then(win => {
      expect(win.location.pathname).to.equal('/users/1/about');
    });
  });
});