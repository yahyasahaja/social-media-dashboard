import React from 'react';
import styled from 'styled-components';
import { PostContext } from '../../contexts/PostContext';
import PostsSkeleton from '../../components/PostsSkeleton';
import Postcard from '../../components/PostCard';
import { PostDialogStore } from '../../contexts/PostDialogContext';
import UpdatePostDialog from './UpdatePostDialog';
import DeletePostDialog from './DeletePostDialog';

const StyledPosts = styled.div`
  display: block;
  flex: 1;
  padding-top: 20px;
  padding-bottom: 50px;
`;

const Posts = props => {
  let { posts, isFetchingPosts, fetchPosts } = React.useContext(PostContext);
  let userId = props.match.params.userId;
  let isPostsReady = !isFetchingPosts && posts.length > 0;

  React.useEffect(() => {
    fetchPosts(userId);
  }, []);

  if (!isPostsReady) {
    return <PostsSkeleton />;
  }

  return (
    <PostDialogStore>
      <StyledPosts>
        {posts.map((post, i) => (
          <Postcard 
            key={i}
            post={post}
            userId={userId}
          />
        ))}
        <UpdatePostDialog />
        <DeletePostDialog />
      </StyledPosts>
    </PostDialogStore>
  );
};

export default Posts;