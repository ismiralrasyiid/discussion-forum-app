import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import useInput from '../hooks/useInput';
import { fetchAddComment } from '../states/threadDetail/action';

function ThreadComments({ threadId, comments }) {
  const defaultInput = '';
  const [content, onContentChangeHandler] = useInput(defaultInput);
  const dispatch = useDispatch();

  const onSubmitCommentHandler = (event) => {
    event.preventDefault();

    if (!content) return toast.error('Komentar tidak boleh kosong');

    const action = fetchAddComment(threadId, content);
    return dispatch(action);
  };

  return (
    <div className="threadComments">
      <CommentForm
        content={content}
        onContentChangeHandler={onContentChangeHandler}
        onSubmitCommentHandler={onSubmitCommentHandler}
      />
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          threadId={threadId}
          commentId={comment.id}
          content={comment.content}
          createdAt={comment.createdAt}
          name={comment.owner.name}
          avatar={comment.owner.avatar}
          upVotesBy={comment.upVotesBy}
          downVotesBy={comment.downVotesBy}
        />
      ))}
    </div>
  );
}

ThreadComments.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ThreadComments;
