import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { COLORS } from '../config';
import { generateAvatarName } from '../utils';

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
      data-testid="user-list-item"
    >
      <ListItemAvatar>
        <Avatar className="avatar" >
          <div 
            data-testid="user-list-item-avatar-name"
            className="avatar-name"
          >
            {generateAvatarName(name)}
          </div>
        </Avatar>
      </ListItemAvatar>
      <ListItemText 
        data-testid="user-list-item-name-email" 
        primary={name} 
        secondary={email}
      />
    </StyledListItem>
  );
};

export default withRouter(UserListItem);