import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';
import { putAccessToken } from '../../utils/api/utils';
import { setAuthUserActionCreator } from '../authUser/action';

const FAILED_PRELOAD_NOTIFICATION = 'Yuk login untuk pakai semua fitur';
const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function preloadingApp() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const authUser = await api.getOwnProfile();
      const action = setAuthUserActionCreator(authUser);
      dispatch(action);
    } catch (error) {
      const action = setAuthUserActionCreator(null);
      dispatch(action);
      putAccessToken('');
      toast.error(FAILED_PRELOAD_NOTIFICATION);
    } finally {
      const action = setIsPreloadActionCreator(false);
      dispatch(action);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, preloadingApp };
