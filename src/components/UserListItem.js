import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { COLORS } from '../config';

const StyledListItem = styled(ListItem)`
  && {
    .avatar {
      background: ${COLORS.primary}
    }

    .avatar-name {
      font-size: 12pt;
      font-weight: 100;
    }
  }
`;

const UserListItem = props => {
  let { user, history } = props;
  let { name, email, id } = user;

  return (
    <StyledListItem 
      button 
      onClick={() => {
        history.push(`/users/${id}`);
      }}
    >
      <ListItemAvatar>
        <Avatar className="avatar" >
          <div 
            className="avatar-name"
          >
            {
              name
                .split(' ')
                .slice(0, 2)
                .map(n => n[0])
                .join('')
            }
          </div>
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={name} secondary={email} />
    </StyledListItem>
  );
};

export default withRouter(UserListItem);