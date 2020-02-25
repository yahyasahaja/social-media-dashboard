import React from 'react';
import styled from 'styled-components';
import Card from './Card';
import Button from '@material-ui/core/Button';
import { PostContext } from '../contexts/PostContext';
import CommentCardSkeleton from './CommentCardSkeleton';
import CommentCard from './CommentCard';
import { PostDialogContext } from '../contexts/PostDialogContext';
import NewCommentForm from './NewCommentForm';

const StyledPostCard = styled.div`
  display: block;
  
  .card {
    width: 100%;
    max-width: 600px;
    margin: auto;
    margin-top: 50px;
    padding: 30px;

    .post-title {
      font-weight: 600;
      font-size: 16pt;
    }

    .post-body {
      font-weight: 300;
      margin-top: 20px;
    }

    .post-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;

      .post-button {
        margin: 0 5px;
      }
    }

    .comment-wrapper {
      margin-top: 10px;
      padding-top: 20px;

      .comment-label {
        font-weight: bold;
        margin-top: 20px;
      }
    }
  }
`;

const PostCard = props => {
  let { 
    fetchCommentByPostId, 
    mappedComments,
  } = React.useContext(PostContext);
  
  let { 
    setMutationBody, 
    setMutationId, 
    setMutationTitle,
    setIsUpdateDialogOpened,
    setIsDeleteDialogOpened,
  } = React.useContext(PostDialogContext);

  let [ isFetchingComments, setIsFetchingComments ] = React.useState(false);
  let [ commentSectionOpened, setCommentSectionOpened ] = React.useState(false);
  let { post } = props;

  let comments = mappedComments[post.id] || [];
  let isCommentsReady = !isFetchingComments && comments.length > 0;

  return (
    <StyledPostCard>
      <Card className="card" >
        <div className="post-title" >
          {post.title}
        </div>
        <div className="post-body" >
          {post.body}
        </div>

        <div className="post-actions" >
          <Button 
            className="comment-button"
            variant="outlined" 
            color="primary"
            onClick={async () => {
              setCommentSectionOpened(!commentSectionOpened);
              if (!mappedComments[post.id] && !isFetchingComments) {
                setIsFetchingComments(true);
                await fetchCommentByPostId(post.id);
                setIsFetchingComments(false);
              }
            }}
          >
            Comments
          </Button>
          
          <div className="mutation-actions" >
            <Button 
              variant="outlined" 
              color="primary"
              className="post-button"
              onClick={() => {
                setMutationTitle(post.title);
                setMutationBody(post.body);
                setMutationId(post.id);
                setIsUpdateDialogOpened(true);
              }}
            >
              Update
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
              className="post-button"
              onClick={() => {
                setMutationTitle(post.title);
                setMutationId(post.id);
                setIsDeleteDialogOpened(true);
              }}
            >
              Delete
            </Button>
          </div>
        </div>

        {
          commentSectionOpened && (
            <div className="comment-wrapper" >
              <div className="comment-label" >
                New Comment
              </div>
              <NewCommentForm postId={post.id} />

              <div className="comment-label" >
                {
                  !isCommentsReady 
                    ? 'Fetching comments...' 
                    : `${comments.length} Comments`
                }
              </div>

              {
                isCommentsReady
                  ? (
                    comments.map((comment, i) => {
                      return (
                        <CommentCard 
                          key={i}
                          comment={comment}
                          postId={post.id}
                        />
                      );
                    })
                  )
                  : (
                    <>
                      <CommentCardSkeleton/>
                      <CommentCardSkeleton/>
                    </>
                  )
              }
            </div>
          )
        }
      </Card>
    </StyledPostCard>
  );
};

export default PostCard;