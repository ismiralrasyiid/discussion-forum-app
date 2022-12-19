import React from 'react';
import { useSelector } from 'react-redux';
import LeaderboardItem from './LeaderboardItem';
import Loading from './Loading';

function Leaderboards() {
  const { leaderboards } = useSelector((states) => states);

  return (
    <aside className="leaderboards">
      <h2>Top Aktivis</h2>
      <p>Pengguna</p>
      <p>Skor</p>
      {leaderboards ? leaderboards.map((leaderboard) => (
        <LeaderboardItem
          key={leaderboard.user.id}
          name={leaderboard.user.name}
          avatar={leaderboard.user.avatar}
          score={leaderboard.score}
        />
      )) : <Loading />}
    </aside>
  );
}

export default Leaderboards;
