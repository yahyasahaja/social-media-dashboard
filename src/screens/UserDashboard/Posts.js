import React from 'react';
import styled from 'styled-components';
import { PostContext } from '../../contexts/PostContext';
import PostsSkeleton from '../../components/PostsSkeleton';
import Postcard from '../../components/PostCard';
import { PostDialogStore } from '../../contexts/PostDialogContext';
import UpdatePostDialog from './UpdatePostDialog';
import DeletePostDialog from './DeletePostDialog';
import NewPostForm from '../../components/NewPostForm';
import { CommentDialogStore } from '../../contexts/CommentDialogContext';
import UpdateCommentDialog from './UpdateCommentDialog';
import DeleteCommentDialog from './DeleteCommentDialog';

const StyledPosts = styled.div`
  display: block;
  flex: 1;
  padding-top: 20px;
  padding-bottom: 50px;
`;

const Posts = props => {
  let { 
    posts, 
    isFetchingPosts, 
    fetchPosts,
  } = React.useContext(PostContext);

  let userId = props.match.params.userId;
  let isPostsReady = !isFetchingPosts && posts.length > 0;

  React.useEffect(() => {
    fetchPosts(userId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostDialogStore>
      <CommentDialogStore>
        <StyledPosts>
          <NewPostForm />
          {
            !isPostsReady
              ? (
                <PostsSkeleton />
              )
              : (
                posts.map((post, i) => (
                  <Postcard 
                    key={i}
                    post={post}
                    userId={userId}
                  />
                ))
              )
          }
          <UpdatePostDialog />
          <DeletePostDialog />
          <UpdateCommentDialog />
          <DeleteCommentDialog />
        </StyledPosts>
      </CommentDialogStore>
    </PostDialogStore>
  );
};

export default Posts;