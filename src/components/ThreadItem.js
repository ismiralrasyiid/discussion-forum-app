import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadStats from './ThreadStats';
import {
  fetchDownVoteThread,
  fetchNeutralizeDownVoteThread,
  fetchNeutralizeUpVoteThread,
  fetchUpVoteThread,
} from '../states/threads/action';

function ThreadItem({
  id,
  title,
  category,
  createdAt,
  name,
  avatar,
  totalComments,
  upVotesBy,
  downVotesBy,
}) {
  const dispatch = useDispatch();

  const upVoteThreadHandler = () => {
    const action = fetchUpVoteThread(id);
    dispatch(action);
  };

  const neutralizeUpVoteThreadHandler = () => {
    const action = fetchNeutralizeUpVoteThread(id);
    dispatch(action);
  };

  const downVoteThreadHandler = () => {
    const action = fetchDownVoteThread(id);
    dispatch(action);
  };

  const neutralizeDownVoteThreadHandler = () => {
    const action = fetchNeutralizeDownVoteThread(id);
    dispatch(action);
  };

  return (
    <article className="item">
      <p>
        #
        {category}
      </p>
      <h3 title="detail"><Link to={`/detail/${id}`}>{title}</Link></h3>
      <ThreadStats
        id={id}
        createdAt={createdAt}
        name={name}
        avatar={avatar}
        totalComments={totalComments}
        upVotesBy={upVotesBy}
        downVotesBy={downVotesBy}
        upVoteHandler={upVoteThreadHandler}
        neutralizeUpVoteHandler={neutralizeUpVoteThreadHandler}
        downVoteHandler={downVoteThreadHandler}
        neutralizeDownVoteHandler={neutralizeDownVoteThreadHandler}
      />
    </article>
  );
}

ThreadItem.defaultProps = {
  category: 'general',
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadItem;
