import PropTypes from 'prop-types';
import React from 'react';

function LeaderboardItem({ name, avatar, score }) {
  return (
    <div className="item">
      <img src={avatar} alt="avatar" />
      <p>{name}</p>
      <p>{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default LeaderboardItem;
