import React from 'react';
import styled from 'styled-components';
import AvatarName from './AvatarName';
import Button from '@material-ui/core/Button';
import { CommentDialogContext } from '../contexts/CommentDialogContext';

const StyledCommentCardSkeleton = styled.div`
  display: flex;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  transition: .3s;

  &:hover {
    background: rgba(52, 152, 219, 0.1);
  }

  .comment-detail-wrapper {
    display: block;

    .name, .email, .body {
      margin: 10px 0;
    }

    .name {
      font-weight: bold;
    }

    .email {
      font-style: italic;
      font-size: 10pt;
    }

    .comment-actions {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;

      .comment-button {
        margin: 0 5px;
      }
    }
  }
`;

const CommentCard = props => {
  let { comment, postId } = props;
  
  let { 
    setMutationName,
    setMutationEmail,
    setMutationBody,
    setMutationId,
    setPostId,
    setIsUpdateDialogOpened,
    setIsDeleteDialogOpened,
  } = React.useContext(CommentDialogContext);

  return (
    <StyledCommentCardSkeleton>
      <div className="avatar-name" >
        <AvatarName name={comment.name} width={50} height={50} />
      </div>
      <div className="comment-detail-wrapper" >
        <div className="name" >
          {comment.name}
        </div>
        <div className="email" >
          {comment.email}
        </div>
        <div className="body" >
          {comment.body}
        </div>
        <div className="comment-actions" >
          <div className="mutation-actions" >
            <Button 
              variant="outlined" 
              color="primary"
              className="comment-button"
              onClick={() => {
                setMutationName(comment.name);
                setMutationEmail(comment.email);
                setMutationBody(comment.body);
                setMutationId(comment.id);
                setPostId(postId);
                setIsUpdateDialogOpened(true);
              }}
            >
              Update
            </Button>
            <Button 
              variant="outlined" 
              color="secondary"
              className="comment-button"
              onClick={() => {
                setMutationName(comment.name);
                setMutationId(comment.id);
                setPostId(postId);
                setIsDeleteDialogOpened(true);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </StyledCommentCardSkeleton>
  );
};

export default CommentCard;