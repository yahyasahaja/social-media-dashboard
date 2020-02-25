import React from 'react';
import { PostContext } from '../../contexts/PostContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { CommentDialogContext } from '../../contexts/CommentDialogContext';

export default () => {
  let { 
    isUpdateDialogOpened, 
    setIsUpdateDialogOpened,
    mutationName,
    setMutationName,
    mutationEmail,
    setMutationEmail,
    mutationBody,
    setMutationBody,
    postId,
    mutationId,
  } = React.useContext(CommentDialogContext);

  let { 
    updateComment,
  } = React.useContext(PostContext);

  let snackbarContext = React.useContext(SnackbarContext);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={isUpdateDialogOpened}
      onClose={() => {
        setIsUpdateDialogOpened(false);
      }}
    >
      <form
        onSubmit={async e => {
          e.preventDefault();
          let result = await updateComment(
            postId,
            mutationId,
            {
              name: mutationName,
              email: mutationEmail,
              body: mutationBody,
            },
          );

          if (result) {
            snackbarContext.show(
              'Update comment successful',
              { severity: 'success' },
            );
          } else {
            snackbarContext.show(
              'Failed to update comment',
              { severity: 'error' },
            );
          }
        }}
      >
        <DialogTitle>Update Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            value={mutationName}
            onChange={e => setMutationName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            value={mutationEmail}
            onChange={e => setMutationEmail(e.target.value)}
          />
          <TextField
            label="Body"
            variant="outlined"
            margin="dense"
            required
            rows={4}
            multiline
            fullWidth
            value={mutationBody}
            onChange={e => setMutationBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setIsUpdateDialogOpened(false);
          }} color="secondary">
            Cancel
          </Button>
          <Button 
            color="primary" 
            autoFocus
            type="submit"
          >
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};