import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { SnackbarContext } from './contexts/SnackbarContext';
import AppRouters from './AppRouters';
import axios from 'axios';
import { BASE_URL } from './config';
import OverlayLoading from './components/OverlayLoading';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers['Accept'] = 'application/json';
axios.defaults.headers['Content-Type'] = 'application/json';

function App() {
  const {
    autoHideDuration,
    isOpened,
    message,
    severity,
    close,
  } = window.snackbar = React.useContext(SnackbarContext);

  return (
    <div className="App">
      <AppRouters />
      <Snackbar
        open={isOpened} 
        autoHideDuration={autoHideDuration} 
        onClose={close}
        message={!severity && message}
      >
        { 
          severity && (
            <Alert onClose={close} severity={severity}>
              {message}
            </Alert>
          )
        }
      </Snackbar>
      <OverlayLoading />
    </div>
  );
}

export default App;
