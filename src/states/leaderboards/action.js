import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';

const ActionType = {
  SET_LEADERBOARDS: 'SET_LEADERBOARDS',
};

function setLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.SET_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function fetchLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const leaderboards = await api.getLeaderBoard();
      const action = setLeaderboardsActionCreator(leaderboards);

      dispatch(action);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, fetchLeaderboards };
