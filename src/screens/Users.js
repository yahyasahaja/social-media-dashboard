import React from 'react';
import styled from 'styled-components';
import Card from '../components/Card';
import { UserContext } from '../contexts/UserContext';
import { COLORS } from '../config';
import List from '@material-ui/core/List';
import UserListItem from '../components/UserListItem';
import UserItemSkeleton from '../components/UserItemSkeleton';

const StyledUsers = styled.div`
  display: block;
  width: 100%;
  min-height: 100vh;
  padding: 100px 0;
  
  .card {
    margin: auto;
    max-width: 480px;

    .app-name {
      font-size: 14pt;
      color: ${COLORS.primary};
      text-align: center;
    }

    .title {
      font-weight: bold;
    }
  }
`;

const Users = () => {
  let { fetchUsers, users, isFetchingUsers } = React.useContext(UserContext);

  React.useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StyledUsers>
      <Card className="card" >
        <h1 className="app-name" >
          Social Media Dashboard
        </h1>

        <div className="title" >Users</div>

        <List>
          {
            isFetchingUsers
              ? (
                <div>
                  <UserItemSkeleton />
                  <UserItemSkeleton />
                  <UserItemSkeleton />
                </div>
              )
              : (
                users.map((user, i) => (
                  <UserListItem
                    key={i}
                    user={user}
                  />
                ))
              )
          }
        </List>
      </Card>
    </StyledUsers>
  );
};

export default Users;