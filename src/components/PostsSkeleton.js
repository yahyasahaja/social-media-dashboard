import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledPostsSkeleton = styled.div`
  display: block;
  flex: 1;
  padding-top: 10px;

  .skeleton-wrapper {
    margin: 20px auto;
    width: 600px;
  }
`;

export default () => {
  return (
    <StyledPostsSkeleton>
      <div className="skeleton-wrapper" >
        <Skeleton height={300} width={600} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={300} width={600} />
      </div>
      <div className="skeleton-wrapper" >
        <Skeleton height={300} width={600} />
      </div>
    </StyledPostsSkeleton>
  );
};