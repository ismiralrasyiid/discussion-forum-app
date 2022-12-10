import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Contents from '../components/Contents';
import ThreadDetail from '../components/ThreadDetail';
import { fetchThreadDetail, setThreadDetailActionCreator } from '../states/threadDetail/action';

function Detail() {
  const { threadId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchThreadDetail(threadId);
    dispatch(action);

    return () => {
      const actionForClearing = setThreadDetailActionCreator(null);
      dispatch(actionForClearing);
    };
  }, [dispatch]);

  return (
    <Contents>
      <ThreadDetail />
    </Contents>
  );
}

export default Detail;
