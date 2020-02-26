import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { SnackbarContext } from '../contexts/SnackbarContext';
import { PostContext } from '../contexts/PostContext';

const StyledNewCommentForm = styled.form`
  display: block;

  .button {
    margin-left: auto;
    display: block;
    margin-top: 10px;
  }
`;

export default props => {
  let snackbarContext = React.useContext(SnackbarContext);
  let {
    addComment,
  } = React.useContext(PostContext);
  let [ name, setName ] = React.useState('');
  let [ email, setEmail ] = React.useState('');
  let [ body, setBody ] = React.useState(''); 
  let { postId } = props;

  return (
    <StyledNewCommentForm
      className="new-post-wrapper" 
      onSubmit={async e => {
        e.preventDefault();
        let result = await addComment(
          postId,
          {
            name,
            email,
            body,
          },
        );

        if (result) {
          snackbarContext.show(
            'Comment successfully added',
            { severity: 'success' },
          );
        } else {
          snackbarContext.show(
            'Failed to add comment',
            { severity: 'error' },
          );
        }
      }}
    >
      <TextField
        label="Name"
        variant="outlined"
        margin="dense"
        data-testid="new-comment-name"
        required
        fullWidth
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <TextField
        label="Email"
        type="email"
        variant="outlined"
        margin="dense"
        data-testid="new-comment-email"
        required
        fullWidth
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Body"
        variant="outlined"
        margin="dense"
        data-testid="new-comment-body"
        required
        rows={4}
        multiline
        fullWidth
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        className="button"
        type="submit"
        data-testid="new-comment-button"
      >
        Post Comment
      </Button>
    </StyledNewCommentForm>
  );
};