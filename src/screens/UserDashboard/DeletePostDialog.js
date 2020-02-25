import React from 'react';
import { PostDialogContext } from '../../contexts/PostDialogContext';
import { PostContext } from '../../contexts/PostContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default () => {
  let { 
    isDeleteDialogOpened,
    setIsDeleteDialogOpened,
    mutationTitle,
    mutationId,
  } = React.useContext(PostDialogContext);

  let { 
    deletePost
  } = React.useContext(PostContext);

  let snackbarContext = React.useContext(SnackbarContext);

  return (
    <Dialog
      open={isDeleteDialogOpened}
      onClose={() => {
        setIsDeleteDialogOpened(false);
      }}
    >
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you wanna delete post: {mutationTitle} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setIsDeleteDialogOpened(false);
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={async () => {
          let result = await deletePost(
            mutationId,
          );

          if (result) {
            snackbarContext.show(
              'Delete post successful',
              { severity: 'success' },
            );
          } else {
            snackbarContext.show(
              'Failed to delete post',
              { severity: 'error' },
            );
          }
        }} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};