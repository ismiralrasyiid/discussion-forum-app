import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import UpVote from '../components/UpVote';
import { setAuthUserActionCreator } from '../states/authUser/action';
import authUserReducer from '../states/authUser/reducer';

const stories = {
  title: 'UpVote',
  component: UpVote,
};

export default stories;

const authUser = {
  id: 'tester101',
  name: 'Tester101',
  email: 'tester101@gmail.com',
  avatar: 'https://generated-image-url.jpg',
};

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});
store.dispatch(setAuthUserActionCreator(authUser));

const Container = styled.div`
  display: flex;
  padding: 5px;
  border: 1px solid gray;
  width: fit-content;
  border-radius: 3px;
  color: #38485e;
  background-color: white;
  > * {
    margin: 3px;
  }
`;

function TemplateStory(args) {
  return (
    <Provider store={store}>
      <Container>
        <UpVote {...args} />
      </Container>
    </Provider>
  );
}

const NotVoted = TemplateStory.bind({});
const Voted = TemplateStory.bind({});
NotVoted.args = {
  upVotesBy: ['doni', 'coni'],
  upVoteHandler: () => {},
  neutralizeUpVoteHandler: () => {},
};
Voted.args = {
  upVotesBy: ['doni', 'coni', 'tester101'],
  upVoteHandler: () => {},
  neutralizeUpVoteHandler: () => {},
};

export { NotVoted, Voted };
