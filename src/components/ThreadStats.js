import React from 'react';
import PropTypes from 'prop-types';
import {
  FaCommentDots,
  FaClock,
} from 'react-icons/fa';

import { postedAt } from '../utils';
import UpVote from './UpVote';
import DownVote from './DownVote';

function ThreadStats({
  avatar,
  name,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  upVoteHandler,
  neutralizeUpVoteHandler,
  downVoteHandler,
  neutralizeDownVoteHandler,
}) {
  return (
    <div className="threadStats">
      <img src={avatar} alt="avatar" />
      <p>{name}</p>
      <FaClock />
      <p>{postedAt(createdAt)}</p>
      <UpVote
        upVotesBy={upVotesBy}
        upVoteHandler={upVoteHandler}
        neutralizeUpVoteHandler={neutralizeUpVoteHandler}
      />
      <DownVote
        downVotesBy={downVotesBy}
        downVoteHandler={downVoteHandler}
        neutralizeDownVoteHandler={neutralizeDownVoteHandler}
      />
      <FaCommentDots title="komentar" />
      <p>{totalComments}</p>
    </div>
  );
}

ThreadStats.propTypes = {
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  upVoteHandler: PropTypes.func.isRequired,
  neutralizeUpVoteHandler: PropTypes.func.isRequired,
  downVoteHandler: PropTypes.func.isRequired,
  neutralizeDownVoteHandler: PropTypes.func.isRequired,
};

export default ThreadStats;
