describe('Posts', () => {
  it('Open posts page and renders correct length', () => {
    cy.visit('/users/1/posts');
    cy.server();
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1/posts',
      'fixture:posts.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1',
      'fixture:user.json'
    );

    cy.get('[data-testid="post-card"]').should('have.length', 10);
  });

  it('Post a new post', () => {
    cy.server();
    cy.route(
      'POST', 
      'https://jsonplaceholder.typicode.com/posts',
      'fixture:newPost.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1/posts',
      'fixture:posts.json'
    );
    cy.get('[data-testid="new-post-title"] input').type('New post title');
    cy.get('[data-testid="new-post-body"] textarea').type('New post body');
    cy.get('[data-testid="new-post-button"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Post successfully added');
  });

  it('Update a post', () => {
    cy.server();
    cy.route(
      'PUT', 
      'https://jsonplaceholder.typicode.com/posts/1',
      'fixture:newPost.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1/posts',
      'fixture:posts.json'
    );

    cy.get('[data-testid="post-card"]')
      .eq(0)
      .find('[data-testid="update-post-button"]')
      .click();
    cy.get('[data-testid="update-post-dialog"]').should('exist');
    cy.get('[data-testid="update-post-title"] input').clear().type('update title');
    cy.get('[data-testid="update-post-body"] textarea').clear().type('update body');
    cy.get('[data-testid="update-post-submit"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Update post successful');
  });

  it('Delete a post', () => {
    cy.server();
    cy.route(
      'DELETE', 
      'https://jsonplaceholder.typicode.com/posts/1',
      'fixture:newPost.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1/posts',
      'fixture:posts.json'
    );

    cy.get('[data-testid="post-card"]')
      .eq(0)
      .find('[data-testid="delete-post-button"]')
      .click();
    cy.get('[data-testid="delete-post-dialog"]').should('exist');
    cy.get('[data-testid="delete-post-dialog-delete-button"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Delete post successful');
  });
});