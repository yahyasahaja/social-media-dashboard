import React from 'react';
import styled from 'styled-components';
import { Button, TextField } from '@material-ui/core';
import { PostContext } from '../contexts/PostContext';
import { SnackbarContext } from '../contexts/SnackbarContext';
import Card from './Card';

const StyledNewPostForm = styled.form`
  margin: 10px 0;

  .card {
    width: 100%;
    max-width: 600px;
    margin: auto;

    .title {
      font-weight: bold;
      margin-bottom: 20px;
    }

    .button {
      margin-left: auto;
      display: block;
      margin-top: 20px;
    }
  }
`;

export default () => {
  let snackbarContext = React.useContext(SnackbarContext);
  let {
    addPost,
  } = React.useContext(PostContext);

  let [ newPostTitle, setNewPostTitle ] = React.useState('');
  let [ newPostBody, setNewPostBody ] = React.useState('');

  return (
    <StyledNewPostForm
      className="new-post-wrapper" 
      onSubmit={async e => {
        e.preventDefault();
        let result = await addPost(
          {
            title: newPostTitle,
            body: newPostBody,
          },
        );

        if (result) {
          snackbarContext.show(
            'Post successfully added',
            { severity: 'success' },
          );
        } else {
          snackbarContext.show(
            'Failed to add post',
            { severity: 'error' },
          );
        }
      }}
    >
      <Card className="card" >
        <div className="title" >
          New Post
        </div>

        <TextField
          label="Title"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          value={newPostTitle}
          onChange={e => setNewPostTitle(e.target.value)}
        />
        <TextField
          label="Body"
          variant="outlined"
          margin="dense"
          required
          rows={4}
          multiline
          fullWidth
          value={newPostBody}
          onChange={e => setNewPostBody(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          className="button"
          type="submit"
        >
          Post
        </Button>
      </Card>
    </StyledNewPostForm>
  );
};