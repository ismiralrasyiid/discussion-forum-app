import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';

const ActionType = {
  SET_THREADS: 'SET_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  NEUTRALIZE_UP_VOTE_THREAD: 'NEUTRALIZE_UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_DOWN_VOTE_THREAD: 'NEUTRALIZE_DOWN_VOTE_THREAD',
};
const CREATE_THREAD_SUCCESS_NOTIFICATION = 'Diskusi berhasil dibuat';

function setThreadsActionCreator(threads) {
  return {
    type: ActionType.SET_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeUpVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.NEUTRALIZE_UP_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function downVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeDownVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.NEUTRALIZE_DOWN_VOTE_THREAD,
    payload: {
      userId,
      threadId,
    },
  };
}

function fetchThreads() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await api.getAllThreads();
      const action = setThreadsActionCreator(threads);

      dispatch(action);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function fetchCreateThread({ title, category, body }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, category, body });
      const action = addThreadActionCreator(thread);

      dispatch(action);
      toast.success(CREATE_THREAD_SUCCESS_NOTIFICATION);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function fetchUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const actionForNeutralize = neutralizeDownVoteThreadActionCreator(id, threadId);
    const actionForUpVote = upVoteThreadActionCreator(id, threadId);

    dispatch(actionForNeutralize);
    dispatch(actionForUpVote);

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = neutralizeUpVoteThreadActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchNeutralizeUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const action = neutralizeUpVoteThreadActionCreator(id, threadId);

    dispatch(action);

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = upVoteThreadActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const actionForNeutralize = neutralizeUpVoteThreadActionCreator(id, threadId);
    const actionForDownVote = downVoteThreadActionCreator(id, threadId);

    dispatch(actionForNeutralize);
    dispatch(actionForDownVote);

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = neutralizeDownVoteThreadActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchNeutralizeDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const action = neutralizeDownVoteThreadActionCreator(id, threadId);

    dispatch(action);

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = downVoteThreadActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

export {
  ActionType,
  setThreadsActionCreator,
  fetchThreads,
  fetchCreateThread,
  fetchUpVoteThread,
  fetchNeutralizeUpVoteThread,
  fetchDownVoteThread,
  fetchNeutralizeDownVoteThread,
};
