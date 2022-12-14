import { toast } from 'react-toastify';
import { api } from '../../utils';
import {
  fetchUpVoteThread,
  neutralizeDownVoteThreadActionCreator,
  neutralizeUpVoteThreadActionCreator,
  upVoteThreadActionCreator,
} from './action';

/*
  fetchUpVoteThread thunk
  - should dispatch action correctly when data fetching success
    (neutralize down vote, up vote, fetch api)
  - should dispatch action correctly when data fetching fail
    (neutralize down vote, up vote, fetch api, show error message, revert up vote)
*/

const state = {
  authUser: {
    id: 'tester101',
  },
};
const threadId = 'thread-1';
const message = 'Request failed';

describe('preloadingApp thunk', () => {
  beforeEach(() => {
    api.upVoteThreadBackup = api.upVoteThread;
    toast.errorBackup = toast.error;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    const actionForUpVote = upVoteThreadActionCreator(state.authUser.id, threadId);
    const actionForNeutralize = neutralizeDownVoteThreadActionCreator(state.authUser.id, threadId);
    api.upVoteThread = jest.fn();
    const dispatch = jest.fn();
    const getState = () => state;

    await fetchUpVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(actionForNeutralize);
    expect(dispatch).toHaveBeenCalledWith(actionForUpVote);
    expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
  });

  it('should dispatch action correctly when data fetching fail', async () => {
    const actionForUpVote = upVoteThreadActionCreator(state.authUser.id, threadId);
    const actionForNeutralize = neutralizeDownVoteThreadActionCreator(state.authUser.id, threadId);
    const revertAction = neutralizeUpVoteThreadActionCreator(state.authUser.id, threadId);
    api.upVoteThread = jest.fn(() => {
      throw new Error(message);
    });
    const dispatch = jest.fn();
    const getState = () => state;
    toast.error = jest.fn();

    await fetchUpVoteThread(threadId)(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(actionForNeutralize);
    expect(dispatch).toHaveBeenCalledWith(actionForUpVote);
    expect(api.upVoteThread).toHaveBeenCalledWith(threadId);
    expect(toast.error).toHaveBeenCalledWith(message);
    expect(dispatch).toHaveBeenCalledWith(revertAction);
  });

  afterEach(() => {
    api.upVoteThread = api.upVoteThreadBackup;
    toast.error = toast.errorBackup;

    delete api.upVoteThreadBackup;
    delete toast.errorBackup;
  });
});
