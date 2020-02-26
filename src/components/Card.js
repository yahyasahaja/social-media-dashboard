import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  box-shadow: 1px 10px 60px 0 #c7c7c7;
  background: white;
`;

const Card = props => (
  <StyledCard className={props.className} >
    {props.children}
  </StyledCard>
);

export default Card;