import React from 'react';
import styled from 'styled-components';
import { UserContext } from '../../contexts/UserContext';
import Card from '../../components/Card';
import { COLORS } from '../../config';
import { CircularProgress } from '@material-ui/core';
import { generateAvatarName } from '../../utils';

const StyledAbout = styled.div`
  display: block;
  flex: 1;
  margin-top: 10px;

  .card {
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-top: 50px;
    padding: 30px;

    .loading {
      display: flex;
      justify-content: center;
      padding: 100px 0;
    }

    .avatar-name {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 70px;
      border-radius: 200px;
      background: ${COLORS.primary};
      color: white;
      font-weight: 300;
      margin: auto;
      font-size: 16pt;
    }

    .name {
      text-align: center;
      font-weight: bold;
      font-size: 14pt;
      margin-top: 20px;
    }

    .email {
      text-align: center;
    }

    .title {
      margin-top: 30px;
      margin-bottom: 10px;
      font-weight: bold;
      font-size: 10pt;
    }
  }
`;

const About = () => {
  let { user, isFetchingUser } = React.useContext(UserContext);
  let isUserReady = !(isFetchingUser || !user);
  let address = '';

  if (isUserReady) {
    address = `${
      user.address.street
    }, ${
      user.address.suite
    }, ${
      user.address.city
    }, ${
      user.address.zipcode
    }`;
  }

  return (
    <StyledAbout>
      <Card className="card" >
        {
          !isUserReady
            ? (
              <div 
                className="loading" 
                data-testid="about-loading"
              >
                <CircularProgress />
              </div>
            )
            : (
              <>
                <div className="avatar-name" >
                  {generateAvatarName(user.name)}
                </div>
                <div 
                  data-testid="about-name"
                  className="name" 
                >
                  {user.name}
                </div>
                <div 
                  data-testid="about-email"
                  className="email" 
                >
                  {user.email}
                </div>
                <div 
                  className="title" 
                >
                  Address
                </div>
                <div 
                  data-testid="about-address"
                  className="address" 
                >
                  {address}
                </div>
                <div className="title" >
                  Phone Number
                </div>
                <div 
                  data-testid="about-phone"
                  className="address" 
                >
                  {user.phone}
                </div>
              </>
            )
        }
      </Card>
    </StyledAbout>
  );
};

export default About;