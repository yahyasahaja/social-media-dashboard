import React from 'react';
import { mount } from 'enzyme';
import Navigation from './Navigation';
import { BrowserRouter } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
React.useLayoutEffect = React.useEffect; 

const navData = [
  {
    label: 'About',
    path: '/users/1/about',
    icon: 'information',
  },
  {
    label: 'Posts',
    path: '/users/2/posts',
    icon: 'post',
  },
  {
    label: 'Albums',
    path: '/users/3/albums',
    icon: 'image-album',
  },
];

describe('Test for component <Navigation />', () => {
  it('Should have length of routes', () => {
    const wrapper = mount(
      <BrowserRouter> 
        <Navigation navData={navData} />
      </BrowserRouter>
    );

    expect(wrapper.find('div[data-testid="route-list-item"]').length).toEqual(3);
    wrapper.unmount();
  });

  it('Should show the user\'s name on navigation-name', () => {
    const wrapper = mount(
      <BrowserRouter> 
        <UserContext.Provider value={{
          user: {
            name: 'Yahya Asti',
          },
          isFetchingUser: false,
        }} >
          <Navigation navData={navData} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    let assert = wrapper.find('[data-testid="navigation-name"] span').text();
    expect(assert).toContain('Yahya Asti');
    wrapper.unmount();
  });

  it('Should show "Back" on navigation-name', () => {
    const wrapper = mount(
      <BrowserRouter> 
        <UserContext.Provider value={{
          isFetchingUser: true,
        }} >
          <Navigation navData={navData} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    let assert = wrapper.find('[data-testid="navigation-name"] span').text();
    expect(assert).toContain('Back');
    wrapper.unmount();
  });

  it('Should show "Not Found" on navigation-name', () => {
    const wrapper = mount(
      <BrowserRouter> 
        <UserContext.Provider value={{
          isFetchingUser: false,
          user: null,
        }} >
          <Navigation navData={navData} />
        </UserContext.Provider>
      </BrowserRouter>
    );
    
    let assert = wrapper.find('[data-testid="navigation-name"] span').text();
    expect(assert).toContain('Not found');
    wrapper.unmount();
  });
});