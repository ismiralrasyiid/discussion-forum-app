import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CommentButton } from './styled/buttons';

function CommentForm({
  content,
  onContentChangeHandler,
  onSubmitCommentHandler,
}) {
  const { authUser } = useSelector((states) => states);

  return (
    <form onSubmit={onSubmitCommentHandler}>
      <label htmlFor="addComment">Beri Komentar</label>
      {authUser ? (
        <>
          <textarea id="addComment" value={content} onChange={onContentChangeHandler} />
          <CommentButton type="submit">Kirim</CommentButton>
        </>
      ) : (
        <p style={({ marginTop: '15px' })}>
          <Link to="/login" style={({ textDecoration: 'underline' })}>Login</Link>
          &nbsp;untuk menambahkan komentar
        </p>
      )}
    </form>
  );
}

CommentForm.propTypes = {
  content: PropTypes.string.isRequired,
  onContentChangeHandler: PropTypes.func.isRequired,
  onSubmitCommentHandler: PropTypes.func.isRequired,
};

export default CommentForm;
