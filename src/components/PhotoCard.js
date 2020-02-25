import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const StyledPhotoCard = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 10px;
  overflow: hidden;
  margin: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .overlay-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: #00000096;
    display: flex;
    justify-content: center;
    padding-top: 20px;

    .overlay-content-wrapper {
      display: block;

      .photo-wrapper {
        width: 500px;
        height: 70vh;

        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .card {
        margin: auto;
        margin-top: 20px;
        background: white;
      }
    }
  }
`;

const PhotoCard = ({photo}) => {
  let [ overlayOpened, setOverlayOpened ] = React.useState(false);
  
  return (
    <StyledPhotoCard onClick={() => {
      setOverlayOpened(!overlayOpened);
    }} >
      <img src={photo.thumbnailUrl} />
      {
        overlayOpened && (
          <div 
            className="overlay-wrapper" 
          >
            <div className="overlay-content-wrapper" >
              <div className='photo-wrapper' >
                <img src={photo.url} />
              </div>
              <Card className="card" >
                {photo.title}
              </Card>
            </div>
          </div>
        )
      }
    </StyledPhotoCard>
  );
};

export default PhotoCard;