import React from 'react';
import { shallow } from 'enzyme';
import PhotoCard from './PhotoCard';

const photo = {
  thumbnailUrl: 'thumbnail.jpg',
  url: 'url.jpg',
  title: 'Hello kumparan world!'
};

describe('Test for component <PhotoCard />', () => {
  it('Should render given props', () => {
    const wrapper = shallow(<PhotoCard photo={photo} />);
  
    expect(
      wrapper
        .find('[data-testid="photo-card-thumbnail"]')
        .prop('src')
    ).toEqual(photo.thumbnailUrl);
    wrapper.unmount();
  });

  it('Should open overlay', () => {
    const wrapper = shallow(<PhotoCard photo={photo} />);
    expect(
      wrapper
        .find('[data-testid="photo-card-overlay"]')
        .exists()
    ).toEqual(false);

    wrapper.find('[data-testid="photo-card"]').props().onClick();
    expect(
      wrapper
        .find('[data-testid="photo-card-overlay"]')
        .exists()
    ).toEqual(true);
    wrapper.unmount();
  });

  it('Should show overlay data', () => {
    const wrapper = shallow(<PhotoCard photo={photo} />);

    wrapper.find('[data-testid="photo-card"]').props().onClick();
    expect(
      wrapper
        .find('[data-testid="photo-card-url"]')
        .prop('src')
    ).toEqual(photo.url);

    expect(
      wrapper
        .find('[data-testid="photo-card-title"]')
        .text()
    ).toEqual(photo.title);
    wrapper.unmount();
  });
});