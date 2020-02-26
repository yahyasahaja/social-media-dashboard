import React from 'react';
import { mount } from 'enzyme';
import Users from './Users';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const users = [
  {
    id: 1,
    name: 'Doe Doe John Angelina',
    email: 'doedoe@angelina.john'
  },
  {
    id: 2,
    name: 'Doe 2',
    email: 'doedoe2@angelina.john'
  },
  {
    id: 3,
    name: 'Doe 3',
    email: 'doedoe3@angelina.john'
  },
];

describe('Test for component <Users />', () => {
  it('Should show correct length of users', () => {
    const wrapper = mount(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            users,
            fetchUsers: () => {},
            isFetchingUsers: false,
          }}
        >
          <Users />
        </UserContext.Provider>
      </BrowserRouter>
    );
  
    expect(
      wrapper.
        find('div[data-testid="user-list-item"]')
        .length
    ).toEqual(users.length); 
    wrapper.unmount();
  });

  it('Should remove loading if user exist', () => {
    const wrapper = mount(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            users,
            fetchUsers: () => {},
            isFetchingUsers: false,
          }}
        >
          <Users />
        </UserContext.Provider>
      </BrowserRouter>
    );
  
    expect(
      wrapper.
        find('[data-testid="users-loading"]')
        .exists()
    ).toEqual(false);
    wrapper.unmount();
  });
  
  it('Should show loading if still fetching users', () => {
    const wrapper = mount(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            users: null,
            fetchUsers: () => {},
            isFetchingUsers: true,
          }}
        >
          <Users />
        </UserContext.Provider>
      </BrowserRouter>
    );
  
    expect(
      wrapper.
        find('[data-testid="users-loading"]')
        .exists()
    ).toEqual(true);
    wrapper.unmount();
  });
});