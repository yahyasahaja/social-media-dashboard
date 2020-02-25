import React from 'react';

export const defaultValue = {
  isUpdateDialogOpened: false,
  isDeleteDialogOpened: false,
  mutationName: '',
  mutationEmail: '',
  mutationBody: '',
  mutationId: null,
  postId: null,
  setIsUpdateDialogOpened: () => {},
  setIsDeleteDialogOpened: () => {},
  setMutationName: () => {},
  setMutationEmail: () => {},
  setMutationBody: () => {},
  setMutationId: () => {},
  setPostId: () => {},
};

export const CommentDialogContext = React.createContext(defaultValue);

export const CommentDialogStore = props => {
  let [ isUpdateDialogOpened, setIsUpdateDialogOpened ] = React.useState(false);
  let [ isDeleteDialogOpened, setIsDeleteDialogOpened ] = React.useState(false);
  let [ mutationName, setMutationName ] = React.useState('');
  let [ mutationEmail, setMutationEmail ] = React.useState('');
  let [ mutationBody, setMutationBody ] = React.useState('');
  let [ mutationId, setMutationId ] = React.useState(null);
  let [ postId, setPostId ] = React.useState(null);
  
  return (
    <CommentDialogContext.Provider
      value={{
        isUpdateDialogOpened,
        isDeleteDialogOpened,
        mutationName,
        mutationEmail,
        mutationBody,
        mutationId,
        postId,
        setIsUpdateDialogOpened,
        setIsDeleteDialogOpened,
        setMutationName,
        setMutationEmail,
        setMutationBody,
        setMutationId,
        setPostId,
      }}
    >
      {props.children}
    </CommentDialogContext.Provider>
  );
};

export const withCommentDialog = Comp => props => (
  <CommentDialogContext.Consumer>
    {context => <Comp {...props} commentDialogContext={context} />}
  </CommentDialogContext.Consumer>
);