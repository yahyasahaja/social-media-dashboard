import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { asyncComponent } from './components/AsyncComponent';

//ROUTERS
const Users = asyncComponent(() => import(
  /* webpackChunkName: "Users" */ './screens/Users'
));
const UserDashboard = asyncComponent(() => import(
  /* webpackChunkName: "UserDashboard" */ './screens/UserDashboard'
));

function AppRouters() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/users" exact component={Users} />
        <Route path="/users/:userId" component={UserDashboard} />
        <Redirect from="*" to="/users" />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouters;
