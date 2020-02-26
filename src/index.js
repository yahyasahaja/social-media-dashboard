import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { SnackbarStore } from './contexts/SnackbarContext';
import { UserStore } from './contexts/UserContext';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { COLORS } from './config';
import { PostStore } from './contexts/PostContext';
import { AlbumStore } from './contexts/AlbumContext';
import { OverlayLoadingStore } from './contexts/OverlayLoadingContext';

const MUITheme = createMuiTheme({
  palette: {
    primary: {
      main: COLORS.primary
    },
    secondary: {
      main: COLORS.secondary
    },
  },
  typography: { 
    useNextVariants: true, 
  }
});

ReactDOM.render(
  <OverlayLoadingStore>
    <UserStore>
      <AlbumStore>
        <PostStore>
          <SnackbarStore>
            <MuiThemeProvider theme={MUITheme}>
              <App />
            </MuiThemeProvider>
          </SnackbarStore>
        </PostStore>
      </AlbumStore>
    </UserStore>
  </OverlayLoadingStore>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
