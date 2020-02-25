import React, { Component} from 'react';

export const defaultValue = {
  isOpened: false,
  show: () => {},
  close: () => {}
};

export const OverlayLoadingContext = React.createContext(defaultValue);

export class OverlayLoadingStore extends Component {
  state = defaultValue

  show = () => {
    this.setState({ isOpened: true });
  }

  hide = () => {
    this.setState({ isOpened: false });
  }

  render() {
    return (
      <OverlayLoadingContext.Provider
        value={{
          ...this.state,
          show: this.show,
          hide: this.hide,
        }}
      >
        {this.props.children}
      </OverlayLoadingContext.Provider>
    );
  }
}

export const withOverlayLoading = Comp => props => (
  <OverlayLoadingContext.Consumer>
    {overlayLoadingContext => 
      <Comp {...props} overlayLoadingContext={overlayLoadingContext} />}
  </OverlayLoadingContext.Consumer>
);