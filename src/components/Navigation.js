import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MDIcon from './MDIcon';
import { UserContext } from '../contexts/UserContext';
import { withRouter } from 'react-router-dom';

const StyledNavigation = styled.div`
  display: block;
  width: 300px;
  height: 100vh;
  position: sticky;
  top: 0;
  background: #ecf0f1;
  box-shadow: 1px 1px 50px #dadada;
  border-right: 1px solid #d0d5d6;
`;

const Navigation = props => {
  let { navData, history } = props;
  let userContext = React.useContext(UserContext);

  let userName = 'Back';

  if (userContext.user) {
    userName = userContext.user.name;
  } else if (!userContext.isFetchingUser) {
    userName = 'Not found';
  }

  return (
    <StyledNavigation>
      <List>
        <ListItem
          button
          onClick={() => {
            history.push('/users');
          }}
        >
          <ListItemIcon><MDIcon icon='chevron-left' /></ListItemIcon>
          <ListItemText
            primary={userName}
          />
        </ListItem>
        <Divider />
        {navData.map((nav, i) => (
          <ListItem
            button
            key={i}
            selected={window.location.pathname.includes(nav.path)}
            onClick={() => {
              history.push(nav.path);
            }}
          >
            <ListItemIcon><MDIcon icon={nav.icon} /></ListItemIcon>
            <ListItemText primary={nav.label} />
          </ListItem>
        ))}
      </List>
    </StyledNavigation>
  );
};

export default withRouter(Navigation);