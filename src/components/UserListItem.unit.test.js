import React from 'react';
import { mount } from 'enzyme';
import UserListItem from './UserListItem';
import { BrowserRouter } from 'react-router-dom';

const user = {
  name: 'Doe Doe John Angelina',
  email: 'doedoe@angelina.john'
};

describe('Test for component <UserListItem />', () => {
  it('Should render given props', () => {
    const wrapper = mount(
      <BrowserRouter>
        <UserListItem user={user} />
      </BrowserRouter>
    );
  
    expect(
      wrapper.
        find('[data-testid="user-list-item-avatar-name"]')
        .text() 
    ).toEqual('DD');

    expect(
      wrapper.
        find('[data-testid="user-list-item-name-email"] span')
        .text()
    ).toEqual(user.name);

    expect(
      wrapper.
        find('[data-testid="user-list-item-name-email"] p')
        .text()
    ).toEqual(user.email);
    wrapper.unmount();
  });
});