import React from 'react';

export const defaultValue = {
  isUpdateDialogOpened: false,
  isDeleteDialogOpened: false,
  mutationTitle: false,
  mutationBody: false,
  mutationId: null,
  setIsUpdateDialogOpened: () => {},
  setIsDeleteDialogOpened: () => {},
  setMutationTitle: () => {},
  setMutationBody: () => {},
  setMutationId: () => {},
};

export const PostDialogContext = React.createContext(defaultValue);

export const PostDialogStore = props => {
  let [ isUpdateDialogOpened, setIsUpdateDialogOpened ] = React.useState(false);
  let [ isDeleteDialogOpened, setIsDeleteDialogOpened ] = React.useState(false);
  let [ mutationTitle, setMutationTitle ] = React.useState('');
  let [ mutationBody, setMutationBody ] = React.useState('');
  let [ mutationId, setMutationId ] = React.useState(null);
  
  return (
    <PostDialogContext.Provider
      value={{
        isUpdateDialogOpened,
        isDeleteDialogOpened,
        mutationTitle,
        mutationBody,
        mutationId,
        setIsUpdateDialogOpened,
        setIsDeleteDialogOpened,
        setMutationTitle,
        setMutationBody,
        setMutationId,
      }}
    >
      {props.children}
    </PostDialogContext.Provider>
  );
};

export const withPostDialog = Comp => props => (
  <PostDialogContext.Consumer>
    {context => <Comp {...props} postDialogContext={context} />}
  </PostDialogContext.Consumer>
);