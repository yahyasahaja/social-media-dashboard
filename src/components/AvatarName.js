import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../config';

const StyledCommentCardSkeleton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({width}) => width ? width : '70'}px;
  height: ${({height}) => height ? height : '70'}px;
  border-radius: 200px;
  background: ${COLORS.primary};
  color: white;
  font-weight: 300;
  font-size: 14pt;
  text-transform: uppercase;
  margin-right: 10px;
  margin-top: 10px;
  line-height: 0;
`;

export default props => {
  return (
    <StyledCommentCardSkeleton width={props.width} height={props.height}>
      {
        props.name
          .split(' ')
          .slice(0, 2)
          .map(n => n[0])
          .join('')
      }
    </StyledCommentCardSkeleton>
  );
};