import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';

describe('Test for component <Card />', () => {
  it('Should render the given children', () => {
    const children = <div>Check</div>;
    const wrapper = shallow(<Card>{children}</Card>);
  
    expect(wrapper.contains(children)).toEqual(true);
    wrapper.unmount();
  });


  it('Should find div', () => {
    const children = <div data-testid="check">Check</div>;
    const wrapper = shallow(<Card>{children}</Card>);
  
    expect(wrapper.find('[data-testid="check"]').length).toEqual(1);
    wrapper.unmount();
  });
});