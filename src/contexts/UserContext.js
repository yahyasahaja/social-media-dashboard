import React, { Component} from 'react';
import axios from 'axios';

export const defaultValue = {
  users: [],
  user: null,
  isFetchingUsers: false,
  fetchUsers: () => {},
  isFetchingUser: false,
  fetchUserById: () => {},
  clearUser: () => {}
};

export const UserContext = React.createContext(defaultValue);

export class UserStore extends Component {
  state = defaultValue

  fetchUsers = async () => {
    try {
      this.setState({isFetchingUsers: true});
      let { data: users } = await axios.get('/users');

      this.setState({
        users
      });
    } catch (err) {
      console.log('ERROR WHILE FETCHING USERS', err);
    } finally {
      this.setState({isFetchingUsers: false});
    }
  }

  fetchUserById = async id => {
    try {
      this.setState({isFetchingUser: true});
      let { data: user } = await axios.get(`/users/${id}`);
      this.setState({user});
      return user;
    } catch (err) {
      console.log('ERROR WHILE FETCHING USER BY ID', err);
    } finally {
      this.setState({isFetchingUser: false});
    }
  }

  clearUser = () => {
    this.setState({user: null, isFetchingUser: false});
  }

  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          fetchUsers: this.fetchUsers,
          fetchUserById: this.fetchUserById,
          clearUser: this.clearUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const withUser = Comp => props => (
  <UserContext.Consumer>
    {context => <Comp {...props} userContext={context} />}
  </UserContext.Consumer>
);