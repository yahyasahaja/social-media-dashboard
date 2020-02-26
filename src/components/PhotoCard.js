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
  transition: .3s;

  &:hover {
    transform: scale(1.2);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: #00000096;
  display: flex;
  justify-content: center;
  padding-top: 50px;
  cursor: pointer;

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
`;

const PhotoCard = ({photo}) => {
  let [ overlayOpened, setOverlayOpened ] = React.useState(false);
  
  return (
    <>
      <StyledPhotoCard data-testid="photo-card" onClick={() => {
        setOverlayOpened(true);
      }} >
        <img data-testid="photo-card-thumbnail" src={photo.thumbnailUrl} alt="" />
      </StyledPhotoCard>
      {
        overlayOpened && (
          <Overlay 
            data-testid="photo-card-overlay"
            className="overlay-wrapper"
            onClick={() => setOverlayOpened(false)}
          >
            <div className="overlay-content-wrapper" >
              <div className='photo-wrapper' >
                <img data-testid="photo-card-url" src={photo.url} alt="" />
              </div>
              <Card className="card" >
                <span data-testid="photo-card-title" >{photo.title}</span>
              </Card>
            </div>
          </Overlay>
        )
      }
    </>
  );
};

export default PhotoCard;