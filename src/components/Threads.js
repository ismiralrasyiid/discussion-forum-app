import React from 'react';
import { useSelector } from 'react-redux';
import Loading from './Loading';
import ThreadItem from './ThreadItem';

function Threads() {
  const { users, threads, filter } = useSelector((states) => states);

  return (
    <main className="threads">
      <h2>Yuk bahas di sini!</h2>
      {threads ? threads
        .filter((thread) => {
          if (!filter) return true;
          return thread.category === filter;
        })
        .map((thread) => {
          const owner = users.filter((user) => user.id === thread.ownerId)[0];
          return (
            <ThreadItem
              key={thread.id}
              id={thread.id}
              title={thread.title}
              category={thread.category}
              createdAt={thread.createdAt}
              name={owner.name}
              avatar={owner.avatar}
              totalComments={thread.totalComments}
              upVotesBy={thread.upVotesBy}
              downVotesBy={thread.downVotesBy}
            />
          );
        }) : <Loading />}
    </main>
  );
}

export default Threads;
