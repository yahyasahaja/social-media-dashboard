import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledPhotosSkeleton = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  .skeleton-wrapper {
    width: 150px;
    height: 150px;
    margin: 10px;
  }
`;

export default () => {
  return (
    <StyledPhotosSkeleton>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={150} width={150} />
      </div>
    </StyledPhotosSkeleton>
  );
};