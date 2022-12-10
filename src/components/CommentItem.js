import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { postedAt } from '../utils';
import {
  fetchDownVoteComment,
  fetchNeutralizeDownVoteComment,
  fetchNeutralizeUpVoteComment,
  fetchUpVoteComment,
} from '../states/threadDetail/action';
import UpVote from './UpVote';
import DownVote from './DownVote';

function CommentItem({
  threadId,
  commentId,
  content,
  createdAt,
  name,
  avatar,
  upVotesBy,
  downVotesBy,
}) {
  const dispatch = useDispatch();

  const upVoteCommentHandler = () => {
    const action = fetchUpVoteComment(threadId, commentId);
    dispatch(action);
  };

  const neutralizeUpVoteCommentHandler = () => {
    const action = fetchNeutralizeUpVoteComment(threadId, commentId);
    dispatch(action);
  };

  const downVoteCommentHandler = () => {
    const action = fetchDownVoteComment(threadId, commentId);
    dispatch(action);
  };

  const neutralizeDownVoteCommentHandler = () => {
    const action = fetchNeutralizeDownVoteComment(threadId, commentId);
    dispatch(action);
  };

  return (
    <div className="commentItem">
      <div className="user">
        <img src={avatar} alt="avatar" />
        <span>{name}</span>
      </div>
      <div className="postedAt">{postedAt(createdAt)}</div>
      <p className="content">{content}</p>
      <div className="vote">
        <UpVote
          upVotesBy={upVotesBy}
          upVoteHandler={upVoteCommentHandler}
          neutralizeUpVoteHandler={neutralizeUpVoteCommentHandler}
        />
        <DownVote
          downVotesBy={downVotesBy}
          downVoteHandler={downVoteCommentHandler}
          neutralizeDownVoteHandler={neutralizeDownVoteCommentHandler}
        />
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  threadId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CommentItem;
