import React from 'react';
import styled from 'styled-components';
import { AlbumContext } from '../../contexts/AlbumContext';
import { asyncComponent } from '../../components/AsyncComponent';
import { Route } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//ROUTERS
const Photos = asyncComponent(() => import(
  /* webpackChunkName: "Photos" */ './Photos'
));

const StyledAlbums = styled.div`
  display: flex;
  flex: 1;

  .albums-wrapper {
    width: 400px;
    padding: 20px;
    background: white;
    border-right: 1px solid #d0d5d6;
    height: 100vh;

    .list {
      margin-top: 20px;
      overflow-y: auto;
      height: calc(100vh - 60px);
      display: block;

      .skeleton-wrapper {
        .skeleton-item {
          margin: 10px 0;
        }
      }
    }
    
    .albums-title {
      font-weight: bold;
      font-size: 12pt;
      text-align: center;
    }
  }
`;

const Albums = props => {
  let { albums, fetchAlbums, isFetchingAlbums } = React.useContext(AlbumContext);
  let { history, match } = props;
  let { userId, albumId } = match.params;
  let isAlbumReady = !isFetchingAlbums && albums.length > 0;

  React.useEffect(() => {
    fetchAlbums(userId);
  }, []);

  return (
    <StyledAlbums>
      <div className="albums-wrapper" >
        <div className="albums-title" >Albums</div>
        <List className="list" >
          {
            !isAlbumReady
              ? (
                <div className="skeleton-wrapper" >
                  <div className="skeleton-item" >
                    <Skeleton width="100%" height="50px" />
                  </div>
                  <div className="skeleton-item" >
                    <Skeleton width="100%" height="50px" />
                  </div>
                  <div className="skeleton-item" >
                    <Skeleton width="100%" height="50px" />
                  </div>
                  <div className="skeleton-item" >
                    <Skeleton width="100%" height="50px" />
                  </div>
                  <div className="skeleton-item" >
                    <Skeleton width="100%" height="50px" />
                  </div>
                </div>
              )
              : (
                albums.map((album, i) => (
                  <ListItem
                    button
                    key={i}
                    onClick={() => {
                      history.push(`/users/${userId}/albums/${album.id}`);
                    }}
                    selected={Number(albumId) === album.id}
                  >
                    <ListItemText
                      primary={album.title}
                    />
                  </ListItem>
                ))
              )
          }
        </List>
      </div>
      
      <Route path="/users/:userId/albums/:albumId" component={Photos} />
    </StyledAlbums>
  );
};

export default Albums;