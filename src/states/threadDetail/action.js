import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';

const ActionType = {
  SET_THREAD_DETAIL: 'SET_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  NEUTRALIZE_UP_VOTE_THREAD_DETAIL: 'NEUTRALIZE_UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL: 'NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  NEUTRALIZE_UP_VOTE_COMMENT: 'NEUTRALIZE_UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_DOWN_VOTE_COMMENT: 'NEUTRALIZE_DOWN_VOTE_COMMENT',
};
const ADD_COMMENT_SUCCESS_NOTIFICATION = 'Komentar ditambahkan';

function setThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.SET_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId, threadId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeUpVoteThreadDetailActionCreator(userId, threadId) {
  return {
    type: ActionType.NEUTRALIZE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId, threadId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function neutralizeDownVoteThreadDetailActionCreator(userId, threadId) {
  return {
    type: ActionType.NEUTRALIZE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
      threadId,
    },
  };
}

function upVoteCommentActionCreator({ userId, threadId, commentId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId,
    },
  };
}

function neutralizeUpVoteCommentActionCreator({ userId, threadId, commentId }) {
  return {
    type: ActionType.NEUTRALIZE_UP_VOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId,
    },
  };
}

function downVoteCommentActionCreator({ userId, threadId, commentId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId,
    },
  };
}

function neutralizeDownVoteCommentActionCreator({ userId, threadId, commentId }) {
  return {
    type: ActionType.NEUTRALIZE_DOWN_VOTE_COMMENT,
    payload: {
      userId,
      threadId,
      commentId,
    },
  };
}

function fetchThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threadDetail = await api.getdetailThread(threadId);
      const action = setThreadDetailActionCreator(threadDetail);

      dispatch(action);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function fetchAddComment(threadId, content) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment(threadId, content);
      const action = addCommentActionCreator(comment);

      dispatch(action);
      toast.success(ADD_COMMENT_SUCCESS_NOTIFICATION);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function fetchUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const actionForNeutralize = neutralizeDownVoteThreadDetailActionCreator(id, threadId);
    const actionForUpVote = upVoteThreadDetailActionCreator(id, threadId);

    dispatch(actionForNeutralize);
    dispatch(actionForUpVote);

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = neutralizeUpVoteThreadDetailActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchNeutralizeUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const action = neutralizeUpVoteThreadDetailActionCreator(id, threadId);

    dispatch(action);

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = upVoteThreadDetailActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const actionForNeutralize = neutralizeUpVoteThreadDetailActionCreator(id, threadId);
    const actionForDownVote = downVoteThreadDetailActionCreator(id, threadId);

    dispatch(actionForNeutralize);
    dispatch(actionForDownVote);

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = neutralizeDownVoteThreadDetailActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchNeutralizeDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const action = neutralizeDownVoteThreadDetailActionCreator(id, threadId);

    dispatch(action);

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = downVoteThreadDetailActionCreator(id, threadId);
      dispatch(revertAction);
    }
  };
}

function fetchUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const actionForNeutralize = neutralizeDownVoteCommentActionCreator({
      userId: id,
      threadId,
      commentId,
    });
    const actionForUpVote = upVoteCommentActionCreator({
      userId: id,
      threadId,
      commentId,
    });

    dispatch(actionForNeutralize);
    dispatch(actionForUpVote);

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = neutralizeUpVoteCommentActionCreator({
        userId: id,
        threadId,
        commentId,
      });
      dispatch(revertAction);
    }
  };
}

function fetchNeutralizeUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const action = neutralizeUpVoteCommentActionCreator({
      userId: id,
      threadId,
      commentId,
    });

    dispatch(action);

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = upVoteCommentActionCreator({
        userId: id,
        threadId,
        commentId,
      });
      dispatch(revertAction);
    }
  };
}

function fetchDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const actionForNeutralize = neutralizeUpVoteCommentActionCreator({
      userId: id,
      threadId,
      commentId,
    });
    const actionForDownVote = downVoteCommentActionCreator({
      userId: id,
      threadId,
      commentId,
    });

    dispatch(actionForNeutralize);
    dispatch(actionForDownVote);

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = neutralizeDownVoteCommentActionCreator({
        userId: id,
        threadId,
        commentId,
      });
      dispatch(revertAction);
    }
  };
}

function fetchNeutralizeDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser: { id } } = getState();
    const action = neutralizeDownVoteCommentActionCreator({
      userId: id,
      threadId,
      commentId,
    });

    dispatch(action);

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      toast.error(error.message);

      const revertAction = downVoteCommentActionCreator({
        userId: id,
        threadId,
        commentId,
      });
      dispatch(revertAction);
    }
  };
}

export {
  ActionType,
  setThreadDetailActionCreator,
  fetchThreadDetail,
  fetchAddComment,
  fetchUpVoteThreadDetail,
  fetchNeutralizeUpVoteThreadDetail,
  fetchDownVoteThreadDetail,
  fetchNeutralizeDownVoteThreadDetail,
  fetchUpVoteComment,
  fetchNeutralizeUpVoteComment,
  fetchDownVoteComment,
  fetchNeutralizeDownVoteComment,
};
