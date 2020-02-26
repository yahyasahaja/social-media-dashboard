describe('Comments', () => {
  it('Open posts page and renders correct comments length', () => {
    cy.server();
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1',
      'fixture:user.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/users/1/posts',
      'fixture:posts.json'
    );

    cy.visit('/users/1/posts');

    cy.get('[data-testid="post-card"]')
      .eq(0)
      .find('[data-testid="post-card-comment-button"]')
      .click();

    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      'fixture:comments.json'
    );
    cy.get('[data-testid="comment-card"]').should('have.length', 5);
  });

  it('Add a new comment on post with id 1', () => {
    cy.server();
    cy.route(
      'POST', 
      'https://jsonplaceholder.typicode.com/comments',
      'fixture:newComment.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      'fixture:comments.json'
    );
    cy.get('[data-testid="new-comment-name"] input').type('New comment name');
    cy.get('[data-testid="new-comment-email"] input').type('newcomment@email.com');
    cy.get('[data-testid="new-comment-body"] textarea').type('New comment body');
    cy.get('[data-testid="new-comment-button"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Comment successfully added');
  });

  it('Update a comment', () => {
    cy.server();
    cy.route(
      'PUT', 
      'https://jsonplaceholder.typicode.com/comments/1',
      'fixture:newComment.json'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      'fixture:comments.json'
    );

    cy.get('[data-testid="comment-card"]')
      .eq(0)
      .find('[data-testid="comment-card-update-button"]')
      .click();
    cy.get('[data-testid="update-comment-dialog"]').should('exist');
    cy.get('[data-testid="update-comment-dialog-name"] input')
      .clear()
      .type('update name');
    cy.get('[data-testid="update-comment-dialog-email"] input')
      .clear()
      .type('update@email.com');
    cy.get('[data-testid="update-comment-dialog-body"] textarea')
      .clear()
      .type('update body');
    cy.get('[data-testid="update-comment-dialog-update-button"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Update comment successful');
  });

  it('Delete a comment', () => {
    cy.server();
    cy.route(
      'DELETE', 
      'https://jsonplaceholder.typicode.com/comments/1',
      '{}'
    );
    cy.route(
      'GET', 
      'https://jsonplaceholder.typicode.com/posts/1/comments',
      'fixture:comments.json'
    );

    cy.get('[data-testid="comment-card"]')
      .eq(0)
      .find('[data-testid="comment-card-delete-button"]')
      .click();
    cy.get('[data-testid="delete-comment-dialog"]').should('exist');
    cy.get('[data-testid="delete-comment-dialog-delete-button"]').click();
    cy.get('.MuiAlert-message').should('contain', 'Delete comment successful');
  });
});