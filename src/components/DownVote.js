import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsDown, FaThumbsDown } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function DownVote({
  downVotesBy,
  downVoteHandler,
  neutralizeDownVoteHandler,
}) {
  const { authUser } = useSelector((states) => states);

  if (!authUser) return null;

  return (
    <>
      {downVotesBy.includes(authUser.id) ? (
        <FaThumbsDown title="suka" className="button" onClick={neutralizeDownVoteHandler} />
      ) : (
        <FaRegThumbsDown title="suka" className="button" onClick={downVoteHandler} />
      )}
      <p>{downVotesBy.length}</p>
    </>
  );
}

DownVote.propTypes = {
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVoteHandler: PropTypes.func.isRequired,
  neutralizeDownVoteHandler: PropTypes.func.isRequired,
};

export default DownVote;
