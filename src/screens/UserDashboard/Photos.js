import React from 'react';
import styled from 'styled-components';
import { AlbumContext } from '../../contexts/AlbumContext';
import PhotosSkeleton from '../../components/PhotosSkeleton';
import PhotoCard from '../../components/PhotoCard';

const StyledPhotos = styled.div`
  display: block;
  flex: 1;
  background: white;
  height: 100vh;
  overflow-y: auto;
  
  .title {
    font-weight: bold;
    font-size: 12pt;
    text-align: center;
    margin-top: 20px;
  }

  .photos-wrapper {
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

const Photos = props => {
  let { 
    mappedPhotos, 
    fetchPhotosByAlbumId,
  } = React.useContext(AlbumContext);
  let [ isFetchingPhotos, setIsFetchingPhotos ] = React.useState(false);
  let { match } = props;
  let albumId = match.params.albumId;

  let photos = mappedPhotos[albumId] || [];
  let isPhotosReady = !isFetchingPhotos && photos.length > 0;

  React.useEffect(() => {
    const fetchPhotos = async () => {
      setIsFetchingPhotos(true);
      await fetchPhotosByAlbumId(albumId);
      setIsFetchingPhotos(false);
    };

    fetchPhotos();
  }, [albumId]);

  return (
    <StyledPhotos>
      <div className="title" >Photos</div>

      {
        !isPhotosReady
          ? (
            <PhotosSkeleton />
          )
          : (
            <div className="photos-wrapper" >
              {
                photos.map((photo, i) => (
                  <PhotoCard 
                    i={i}
                    key={i} 
                    photo={photo}
                  />
                ))
              }
            </div>
          )
      }
    </StyledPhotos>
  );
};

export default Photos;