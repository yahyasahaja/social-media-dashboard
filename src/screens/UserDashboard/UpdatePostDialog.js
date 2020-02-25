import React from 'react';
import { PostDialogContext } from '../../contexts/PostDialogContext';
import { PostContext } from '../../contexts/PostContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default () => {
  let { 
    isUpdateDialogOpened, 
    setIsUpdateDialogOpened,
    mutationTitle,
    setMutationTitle,
    mutationBody,
    setMutationBody,
    mutationId,
  } = React.useContext(PostDialogContext);

  let { 
    updatePost
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
      <DialogTitle>Update Post</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          margin="dense"
          fullWidth
          value={mutationTitle}
          onChange={e => setMutationTitle(e.target.value)}
        />
        <TextField
          label="Body"
          variant="outlined"
          margin="dense"
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
        <Button onClick={async () => {
          let result = await updatePost(
            mutationId, 
            {
              title: mutationTitle,
              body: mutationBody,
            },
          );

          if (result) {
            snackbarContext.show(
              'Update post successful',
              { severity: 'success' },
            );
          } else {
            snackbarContext.show(
              'Failed to update post',
              { severity: 'error' },
            );
          }
        }} color="primary" autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};