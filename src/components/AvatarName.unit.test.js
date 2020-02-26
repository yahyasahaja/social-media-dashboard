import React from 'react';
import { shallow } from 'enzyme';
import AvatarName from './AvatarName';

describe('Test for componnennt <AvatarName />', () => {
  it('Should show 2 first character words of given name props', () => {
    const wrapper = shallow(<AvatarName name="Asti Annisa" />);
  
    expect(wrapper.text()).toContain('AA');
    wrapper.unmount();
  });

  it('Should show first character for given one word name props', () => {
    const wrapper = shallow(<AvatarName name="Asti" />);
  
    expect(wrapper.text()).toContain('A');
    wrapper.unmount();
  });

  it('Display result value with Upper Case', () => {
    const wrapper = shallow(<AvatarName name="asti annisa amalia" />);
  
    expect(wrapper.text()).toContain('AA');
    wrapper.unmount();
  });
});