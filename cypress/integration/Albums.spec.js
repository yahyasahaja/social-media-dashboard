describe('Albums list', () => {
  it('Open albums page and renders correct length', () => {
    cy.visit('/users');
    cy.server();
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1',
      'fixture:user.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1/albums',
      'fixture:albums.json'
    );
    cy.visit('/users/1/albums');

    cy.get('[data-testid="albums-list-item"]').should('have.length', 10);
  });

  it('Open photos from album with id 1', () => {
    cy.server();
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/albums/1/photos',
      'fixture:photos.json'
    );

    cy.get('[data-testid="albums-list-item"]').first().click();
    cy.window().then(win => {
      expect(win.location.pathname).to.equal('/users/1/albums/1');
    });
    cy.get('[data-testid="photo-card"]').should('have.length', 50);
  });

  it('Open and close photo detail', () => {
    cy.get('[data-testid="photo-card"]').first().click();
    cy.get('[data-testid="photo-card-overlay"]')
      .should('exist')
      .click()
      .should('not.exist');
  });
});