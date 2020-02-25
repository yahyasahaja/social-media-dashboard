import React from 'react';
import { PostContext } from '../../contexts/PostContext';
import { SnackbarContext } from '../../contexts/SnackbarContext';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CommentDialogContext } from '../../contexts/CommentDialogContext';

export default () => {
  let { 
    isDeleteDialogOpened,
    setIsDeleteDialogOpened,
    mutationName,
    mutationId,
    postId,
  } = React.useContext(CommentDialogContext);

  let { 
    deleteComment
  } = React.useContext(PostContext);

  let snackbarContext = React.useContext(SnackbarContext);

  return (
    <Dialog
      open={isDeleteDialogOpened}
      onClose={() => {
        setIsDeleteDialogOpened(false);
      }}
    >
      <DialogTitle>Delete Comment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you wanna delete comment from {mutationName} ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {
          setIsDeleteDialogOpened(false);
        }} color="primary">
          Cancel
        </Button>
        <Button onClick={async () => {
          let result = await deleteComment(
            postId,
            mutationId,
          );

          if (result) {
            snackbarContext.show(
              'Delete comment successful',
              { severity: 'success' },
            );
          } else {
            snackbarContext.show(
              'Failed to delete comment',
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