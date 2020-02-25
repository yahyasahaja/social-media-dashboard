import React, { Component} from 'react';
import axios from 'axios';

export const defaultValue = {
  albums: [],
  mappedPhotos: {},
  isFetchingPhotos: false,
  isFetchingAlbums: false,
  fetchPhotosByAlbumId: () => {},
  fetchAlbums: () => {},
  clearAlbum: () => {},
};

export const AlbumContext = React.createContext(defaultValue);

export class AlbumStore extends Component {
  state = defaultValue

  fetchAlbums = async (userId) => {
    try {
      this.setState({isFetchingAlbums: true});
      let { data: albums } = await axios.get(`/users/${userId}/albums`);

      this.setState({
        albums
      });
    } catch (err) {
      console.log('ERROR WHILE FETCHING ALBUMS', err);
    } finally {
      this.setState({isFetchingAlbums: false});
    }
  }

  fetchPhotosByAlbumId = async albumId => {
    try {
      this.setState({isFetchingPhotos: true});
      let { data: photos } = await axios.get(`/albums/${albumId}/photos`);

      this.setState({
        mappedPhotos: {
          ...this.state.mappedPhotos,
          [albumId]: photos
        }
      });
    } catch (err) {
      console.log('ERROR WHILE FETCHING PHOTOS', err);
    } finally {
      this.setState({isFetchingPhotos: false});
    }
  }

  render() {
    return (
      <AlbumContext.Provider
        value={{
          ...this.state,
          fetchPhotosByAlbumId: this.fetchPhotosByAlbumId,
          fetchAlbums: this.fetchAlbums,
          clearAlbum: this.clearAlbum,
        }}
      >
        {this.props.children}
      </AlbumContext.Provider>
    );
  }
}

export const withAlbum = Comp => props => (
  <AlbumContext.Consumer>
    {context => <Comp {...props} albumContext={context} />}
  </AlbumContext.Consumer>
);