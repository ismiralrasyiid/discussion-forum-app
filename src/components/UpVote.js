import React from 'react';
import PropTypes from 'prop-types';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

function UpVote({
  upVotesBy,
  upVoteHandler,
  neutralizeUpVoteHandler,
}) {
  const { authUser } = useSelector((states) => states);

  if (!authUser) return null;

  return (
    <>
      {upVotesBy.includes(authUser.id) ? (
        <FaThumbsUp title="suka" className="button" onClick={neutralizeUpVoteHandler} />
      ) : (
        <FaRegThumbsUp title="suka" className="button" onClick={upVoteHandler} />
      )}
      <p>{upVotesBy.length}</p>
    </>
  );
}

UpVote.propTypes = {
  /**
   * Array of users who voted
  */
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /**
   * Handler function
  */
  upVoteHandler: PropTypes.func.isRequired,
  /**
   * Handler function
  */
  neutralizeUpVoteHandler: PropTypes.func.isRequired,
};

export default UpVote;
