import React from 'react';
import { mount } from 'enzyme';
import CommentCard from './CommentCard';

const comment = {
  name: 'Umang Asti',
  email: 'uamng.asti@yahya.com',
  body: 'Kumparan, yes!'
};

describe('Test for component <CommentCard />', () => {
  it('Should render given props', () => {
    const wrapper = mount(<CommentCard comment={comment} />);
  
    expect(wrapper.find('div[data-testid="avatar-name"]').text()).toEqual('UA');
    expect(wrapper.find('[data-testid="comment-name"]').text()).toEqual(comment.name);
    expect(wrapper.find('[data-testid="comment-email"]').text()).toEqual(comment.email);
    expect(wrapper.find('[data-testid="comment-body"]').text()).toEqual(comment.body);
    wrapper.unmount();
  });
});