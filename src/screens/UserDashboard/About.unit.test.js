import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import About from './About';

const user = {
  id: 1,
  name: 'Doe Doe John Angelina',
  email: 'doedoe@angelina.john',
  address: {
    street: 'Jl. mruwak',
    suite: 'Apt. 11',
    city: 'Malang',
    zipCode: '12304-1',
  }, 
  phone: '0882828282',
};

describe('Test for component <About />', () => {
  it('Should render loading if fetching user', () => {
    const wrapper = mount(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user: null,
            isFetchingUser: true,
          }}
        >
          <About />
        </UserContext.Provider>
      </BrowserRouter>
    );
  
    expect(
      wrapper.
        find('div[data-testid="about-loading"]')
        .exists()
    ).toEqual(true);
    wrapper.unmount();
  });

  it('Should render the given props', () => {
    const wrapper = mount(
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            isFetchingUser: false,
          }}
        >
          <About />
        </UserContext.Provider>
      </BrowserRouter>
    );

    let address = `${
      user.address.street
    }, ${
      user.address.suite
    }, ${
      user.address.city
    }, ${
      user.address.zipcode
    }`;
  
    expect(
      wrapper.
        find('div[data-testid="about-name"]')
        .text()
    ).toEqual(user.name);
    expect(
      wrapper.
        find('div[data-testid="about-email"]')
        .text()
    ).toEqual(user.email);
    expect(
      wrapper.
        find('div[data-testid="about-address"]')
        .text()
    ).toEqual(address);
    expect(
      wrapper.
        find('div[data-testid="about-phone"]')
        .text()
    ).toEqual(user.phone);
    
    wrapper.unmount();
  });
});