import React from 'react';
import styled from 'styled-components';
import AvatarName from './AvatarName';

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
  }
`;

const CommentCard = props => {
  let { comment } = props;

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
      </div>
    </StyledCommentCardSkeleton>
  );
};

export default CommentCard;