import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Categories from '../components/Categories';
import Contents from '../components/styled/Contents';
import Leaderboards from '../components/Leaderboards';
import Threads from '../components/Threads';
import { fetchLeaderboards } from '../states/leaderboards/action';
import { fetchCategories, fetchThreadsAndUsers } from '../states/shared/action';
import store from '../states';
import LoginPageNavigation from '../components/LoginPageNavigation';
import ToTopPageNavigation from '../components/ToTopPageNavigation';
import CreatePageNavigation from '../components/CreatePageNavigation';

function Home() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    const actionForLeaderboards = fetchLeaderboards();
    const actionForThreadsAndUsers = fetchThreadsAndUsers();
    const actionForCategories = fetchCategories(store);

    dispatch(actionForThreadsAndUsers);
    dispatch(actionForLeaderboards);
    dispatch(actionForCategories);
  }, [dispatch]);

  return (
    <Contents>
      <Categories />
      <Threads />
      <Leaderboards />
      {authUser ? <CreatePageNavigation /> : <LoginPageNavigation />}
      <ToTopPageNavigation />
    </Contents>
  );
}

export default Home;
