import React from 'react';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';

const StyledUserItemSkeleton = styled.div`
  display: flex;
  margin: 20px 0;

  .skeleton-wrapper {
    width: 400px;
    margin-left: 10px;
  }
`;

export default () => {
  return (
    <StyledUserItemSkeleton>
      <div>
        <Skeleton circle height={50} width={50} />
      </div>
      <div>
        <div className="skeleton-wrapper" >
          <Skeleton height={10} width={100} />
        </div>
        <div className="skeleton-wrapper" >
          <Skeleton height={10} width={200} />
        </div>
      </div>
    </StyledUserItemSkeleton>
  );
};