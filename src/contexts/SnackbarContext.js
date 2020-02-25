import React, { Component} from 'react';

export const defaultValue = {
  isOpened: false,
  autoHideDuration: 6000,
  severity: null,
  message: '',
  show: () => {},
  close: () => {}
};

export const SnackbarContext = React.createContext(defaultValue);

export class SnackbarStore extends Component {
  state = defaultValue

  show = (message = '', state = {}) => {
    this.setState({...state, message, isOpened: true});
  }

  close = () => {
    this.setState({isOpened: false}); 
  }

  render() {
    return (
      <SnackbarContext.Provider
        value={{
          ...this.state,
          show: this.show,
          close: this.close,
        }}
      >
        {this.props.children}
      </SnackbarContext.Provider>
    );
  }
}

export const withSnackbar = Comp => props => (
  <SnackbarContext.Consumer>
    {snackbarContext => <Comp {...props} snackbarContext={snackbarContext} />}
  </SnackbarContext.Consumer>
);