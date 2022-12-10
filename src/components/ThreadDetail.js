import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchDownVoteThreadDetail,
  fetchNeutralizeDownVoteThreadDetail,
  fetchNeutralizeUpVoteThreadDetail,
  fetchUpVoteThreadDetail,
} from '../states/threadDetail/action';
import {
  fetchDownVoteThread,
  fetchNeutralizeDownVoteThread,
  fetchNeutralizeUpVoteThread,
  fetchUpVoteThread,
} from '../states/threads/action';
import ThreadComments from './ThreadComments';
import ThreadStats from './ThreadStats';

function ThreadDetail() {
  const { threadDetail } = useSelector((states) => states);

  const dispatch = useDispatch();

  const upVoteThreadDetailHandler = () => {
    const actionForThreadDetail = fetchUpVoteThreadDetail(threadDetail.id);
    const actionForThreads = fetchUpVoteThread(threadDetail.id);

    dispatch(actionForThreadDetail);
    dispatch(actionForThreads);
  };

  const neutralizeUpVoteThreadDetailHandler = () => {
    const actionForThreadDetail = fetchNeutralizeUpVoteThreadDetail(threadDetail.id);
    const actionForThreads = fetchNeutralizeUpVoteThread(threadDetail.id);

    dispatch(actionForThreadDetail);
    dispatch(actionForThreads);
  };

  const downVoteThreadDetailHandler = () => {
    const actionForThreadDetail = fetchDownVoteThreadDetail(threadDetail.id);
    const actionForThreads = fetchDownVoteThread(threadDetail.id);

    dispatch(actionForThreadDetail);
    dispatch(actionForThreads);
  };

  const neutralizeDownVoteThreadDetailHandler = () => {
    const actionForThreadDetail = fetchNeutralizeDownVoteThreadDetail(threadDetail.id);
    const actionForThreads = fetchNeutralizeDownVoteThread(threadDetail.id);

    dispatch(actionForThreadDetail);
    dispatch(actionForThreads);
  };

  return threadDetail ? (
    <main className="threadDetail">
      <h2>Bahas detail di sini!</h2>
      <article className="item">
        <p className="category">
          #
          {threadDetail.category}
        </p>
        <h3>{threadDetail.title}</h3>
        <p className="body">{threadDetail.body}</p>
        <ThreadStats
          createdAt={threadDetail.createdAt}
          name={threadDetail.owner.name}
          avatar={threadDetail.owner.avatar}
          totalComments={threadDetail.comments.length}
          upVotesBy={threadDetail.upVotesBy}
          downVotesBy={threadDetail.downVotesBy}
          upVoteHandler={upVoteThreadDetailHandler}
          neutralizeUpVoteHandler={neutralizeUpVoteThreadDetailHandler}
          downVoteHandler={downVoteThreadDetailHandler}
          neutralizeDownVoteHandler={neutralizeDownVoteThreadDetailHandler}
        />
        <ThreadComments
          threadId={threadDetail.id}
          comments={threadDetail.comments}
        />
      </article>
    </main>
  ) : null;
}

export default ThreadDetail;
