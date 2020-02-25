//MODULES
import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import styled from 'styled-components';

//COMPONENT
import { SnackbarContext } from '../contexts/SnackbarContext';

const PageLoading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 20000;
`;

export const AsyncComponent = props => {
  let [ Component, setComponent ] = React.useState(null);
  let [ loading, setLoading ] = React.useState(true);
  let snackbarContext = React.useContext(SnackbarContext);

  React.useEffect(() => {
    setLoading(true);
    const fetchComponent = async () => {
      try {
        let modules = await props.load();
        setLoading(false);
        setComponent(() => modules.default);
      } catch (err) {
        snackbarContext.show(
          'Error loading page, please refresh page',
          {
            severity: 'error'
          }
        );
        console.log('ERROR WHILE LOADING PAGE ROUTE', err);
      }
    };

    fetchComponent();
  }, []);

  if (loading) return (
    <PageLoading>
      <LinearProgress />
    </PageLoading> 
  );

  if (Component)
    return <Component {...props} />;

  return <div>404 Not Found</div>;
};

export const asyncComponent = load => props => (
  <AsyncComponent load={load} {...props} />
);

//DEFAULTS
export default asyncComponent;