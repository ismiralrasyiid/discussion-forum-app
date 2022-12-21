import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ThreadDetail from '../components/ThreadDetail';
import authUserReducer from '../states/authUser/reducer';
import threadDetailReducer from '../states/threadDetail/reducer';
import { setAuthUserActionCreator } from '../states/authUser/action';
import { setThreadDetailActionCreator } from '../states/threadDetail/action';
import '../styles/style.css';

const stories = {
  title: 'ThreadDetail',
  component: ThreadDetail,
};

export default stories;

const authUser = {
  id: 'tester101',
  name: 'Tester101',
  email: 'tester101@gmail.com',
  avatar: 'https://generated-image-url.jpg',
};
const threadDetail = {
  id: 'thread-08_nUU2fhu1P5nre',
  title: 'Pengalaman Belajar React di Dicoding',
  body: 'Menurut teman-teman, bagaimana pengalaman belajar kelas React di Dicoding? Apakah mudah ataukah sulit? Yuk, ceritakan di sini.',
  createdAt: '2022-11-13T09:59:31.019Z',
  owner: {
    id: 'user-5PqX6Ldhnk_ifroq',
    name: 'Dimas Saputra',
    avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
  },
  category: 'react',
  comments: [{
    id: 'comment-YTSJSqOj7XQgFB33',
    content: 'test',
    createdAt: '2022-12-13T04:32:25.594Z',
    owner: {
      id: 'user-5PqX6Ldhnk_ifroq',
      name: 'Dimas Saputra',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    upVotesBy: [],
    downVotesBy: ['user-5PqX6Ldhnk_ifroq'],
  }],
  upVotesBy: ['user-6oWew2w2Wx5xLUTU', 'user-5PqX6Ldhnk_ifroq', 'user--ybu2bVWJbazWPli'],
  downVotesBy: [],
};

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    threadDetail: threadDetailReducer,
  },
});
store.dispatch(setThreadDetailActionCreator(threadDetail));

function NotAuthedTemplateStory() {
  store.dispatch(setAuthUserActionCreator(null));
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ThreadDetail />
      </BrowserRouter>
    </Provider>
  );
}

function AuthedTemplateStory() {
  store.dispatch(setAuthUserActionCreator(authUser));
  return (
    <Provider store={store}>
      <ThreadDetail />
    </Provider>
  );
}

const NotAuthed = NotAuthedTemplateStory.bind({});
const Authed = AuthedTemplateStory.bind({});

export { NotAuthed, Authed };
