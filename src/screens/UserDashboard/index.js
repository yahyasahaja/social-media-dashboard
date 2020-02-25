import React from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import Navigation from '../../components/Navigation';
import { COLORS } from '../../config';
import { Switch, Route, Redirect } from 'react-router-dom';
import { asyncComponent } from '../../components/AsyncComponent';

//ROUTERS
const About = asyncComponent(() => import(
  /* webpackChunkName: "About" */ './About'
));

const Posts = asyncComponent(() => import(
  /* webpackChunkName: "Posts" */ './Posts'
));

const Albums = asyncComponent(() => import(
  /* webpackChunkName: "Albums" */ './Albums'
));

const StyledUserDashboard = styled.div`
  display: flex;
  background: ${COLORS.background};
`;

const UserDashboard = props => {
  let userContext = React.useContext(UserContext);
  let userId = props.match.params.userId;

  React.useEffect(() => {
    userContext.fetchUserById(userId);

    return () => {
      userContext.clearUser();
    };
  }, []);

  const navData = [
    {
      label: 'About',
      path: `/users/${userId}/about`,
      icon: 'information',
    },
    {
      label: 'Posts',
      path: `/users/${userId}/posts`,
      icon: 'post',
    },
    {
      label: 'Albums',
      path: `/users/${userId}/albums`,
      icon: 'image-album',
    },
  ];

  return (
    <StyledUserDashboard>
      <Navigation navData={navData} />
      <Switch>
        <Route path="/users/:userId/about" exact component={About} />
        <Route path="/users/:userId/posts" component={Posts} />
        <Route path="/users/:userId/albums/:albumId" component={Albums} />
        <Route path="/users/:userId/albums" component={Albums} />
        <Redirect from="*" to={`/users/${userId}/about`} />
      </Switch>
    </StyledUserDashboard>
  );
};

export default UserDashboard;