import React from 'react';
import { shallow } from 'enzyme';
import PostCard from './PostCard';

const post = {
  title: 'Asti Yahya',
  body: 'We have this post! yupp!!'
};

describe('Test for component <PostCard />', () => {
  it('Should render given props', () => {
    const wrapper = shallow(<PostCard post={post} />);
  
    expect(
      wrapper.
        find('[data-testid="post-card-title"]')
        .text() 
    ).toEqual(post.title);

    expect(
      wrapper.
        find('[data-testid="post-card-body"]')
        .text()
    ).toEqual(post.body);
    wrapper.unmount();
  });

  it('Should open comment section', () => {
    const wrapper = shallow(<PostCard post={post} />);

    expect(
      wrapper
        .find('[data-testid="post-card-comment-section"]')
        .exists()
    ).toEqual(false);
  
    wrapper.find('[data-testid="post-card-comment-button"]').props().onClick();

    expect(
      wrapper
        .find('[data-testid="post-card-comment-section"]')
        .exists()
    ).toEqual(true);
    wrapper.unmount();
  });
});