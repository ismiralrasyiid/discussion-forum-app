import React from 'react';
import PropTypes from 'prop-types';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import authUserReducer from '../states/authUser/reducer';
import isPreloadReducer from '../states/isPreload/reducer';
import threadsReducer from '../states/threads/reducer';
import UpVote from './UpVote';
import { preloadingApp } from '../states/isPreload/action';
import { api } from '../utils';
import { fetchThreads, fetchUpVoteThread, fetchNeutralizeUpVoteThread } from '../states/threads/action';

/*
  UpVote Component should be integrated with redux store
  - should not render UpVote component if user isnt authed
  - should revert action if upVote api request failed
  - should show correct numbers of vote if upVote api request success
  - should revert action if neutralizeVote api request failed
  - should show correct numbers of vote if neutralizeVote api request success
*/

const authUser = {
  id: 'tester101',
  name: 'Tester101',
  email: 'tester101@gmail.com',
  avatar: 'https://generated-image-url.jpg',
};
const threads = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'tester101',
    upVotesBy: ['budi', 'tono', 'tirto'],
    downVotesBy: [],
    totalComments: 0,
  },
  {
    id: 'thread-2',
    title: 'Thread Kedua',
    body: 'Ini adalah thread kedua',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'tester102',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];
const threadId = 'thread-1';

const store = configureStore({
  reducer: {
    isPreload: isPreloadReducer,
    authUser: authUserReducer,
    threads: threadsReducer,
  },
});
function UpVoteWrapper({
  upVoteHandler,
  neutralizeUpVoteHandler,
}) {
  return (
    <Provider store={store}>
      <UpVote
        upVotesBy={store.getState().threads[0].upVotesBy}
        upVoteHandler={upVoteHandler}
        neutralizeUpVoteHandler={neutralizeUpVoteHandler}
      />
    </Provider>
  );
}
UpVoteWrapper.propTypes = {
  upVoteHandler: PropTypes.func.isRequired,
  neutralizeUpVoteHandler: PropTypes.func.isRequired,
};

describe('UpVote Component should be integrated with redux store', () => {
  const dummyFunction = () => ({});

  beforeAll(() => {
    api.getOwnProfileBackup = api.getOwnProfile;
    api.getAllThreadsBackup = api.getAllThreads;
    api.upVoteThreadBackup = api.upVoteThread;
  });

  it('should not render UpVote component if user isnt authed', async () => {
    api.getAllThreads = () => threads;
    api.getOwnProfile = () => null;
    await store.dispatch(fetchThreads());
    await store.dispatch(preloadingApp());

    render(
      <UpVoteWrapper
        upVoteHandler={dummyFunction}
        neutralizeUpVoteHandler={dummyFunction}
      />,
    );
    const UpVoteElement = document.querySelector('button');

    expect(UpVoteElement).toBeNull();
  });

  it('should show correct numbers of vote if upVote api request success', async () => {
    const upVoteHandler = jest.fn(() => store.dispatch(fetchUpVoteThread(threadId)));
    api.getOwnProfile = () => authUser;
    api.upVoteThread = () => ({});
    await store.dispatch(preloadingApp());

    render(
      <UpVoteWrapper
        upVoteHandler={upVoteHandler}
        neutralizeUpVoteHandler={dummyFunction}
      />,
    );
    const NumbersOfVoteBeforeClicked = document.querySelector('p');
    const UpVoteButton = screen.getByTitle('suka');
    userEvent.click(UpVoteButton);
    render(
      <UpVoteWrapper
        upVoteHandler={upVoteHandler}
        neutralizeUpVoteHandler={dummyFunction}
      />,
    );
    const NumbersOfVoteAfterClicked = document.querySelectorAll('p')[1];

    expect(NumbersOfVoteBeforeClicked).toHaveTextContent(3);
    expect(upVoteHandler).toHaveBeenCalled();
    expect(NumbersOfVoteAfterClicked).toHaveTextContent(4);
  });

  it('should show correct numbers of vote if neutralizeVote api request success', () => {
    const neutralizeUpVoteHandler = jest.fn(
      () => store.dispatch(fetchNeutralizeUpVoteThread(threadId)),
    );
    api.neutralVoteThread = () => ({});

    render(
      <UpVoteWrapper
        upVoteHandler={dummyFunction}
        neutralizeUpVoteHandler={neutralizeUpVoteHandler}
      />,
    );
    const NumbersOfVoteBeforeClicked = document.querySelector('p');
    const UpVoteButton = screen.getByTitle('suka');
    userEvent.click(UpVoteButton);
    render(
      <UpVoteWrapper
        upVoteHandler={dummyFunction}
        neutralizeUpVoteHandler={neutralizeUpVoteHandler}
      />,
    );
    const NumbersOfVoteAfterClicked = document.querySelectorAll('p')[1];

    expect(NumbersOfVoteBeforeClicked).toHaveTextContent(4);
    expect(neutralizeUpVoteHandler).toHaveBeenCalled();
    expect(NumbersOfVoteAfterClicked).toHaveTextContent(3);
  });

  afterAll(() => {
    api.getOwnProfile = api.getOwnProfileBackup;
    api.getAllThreads = api.getAllThreadsBackup;
    api.upVoteThread = api.upVoteThreadBackup;
    delete api.getOwnProfileBackup;
    delete api.getAllThreadsBackup;
    delete api.upVoteThreadBackup;
  });
});
