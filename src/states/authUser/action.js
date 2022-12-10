import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';
import { putAccessToken } from '../../utils/api/utils';

const SUCCESS_LOGIN_NOTIFICATION = 'Login sebagai ';
const SUCCESS_LOGOUT_NOTIFICATION = 'Berhasil keluar ';
const SUCCESS_REGISTER_NOTIFICATION = ' berhasil didaftarkan';
const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function fetchAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      await api.login({ email, password });
      const authUser = await api.getOwnProfile();
      const action = setAuthUserActionCreator(authUser);
      dispatch(action);
      toast.success(SUCCESS_LOGIN_NOTIFICATION + authUser.name);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function registerAccount({ username, email, password }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const user = await api.register({ username, email, password });
      toast.success(user.name + SUCCESS_REGISTER_NOTIFICATION);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

function logout() {
  return (dispatch) => {
    const action = unsetAuthUserActionCreator();
    dispatch(action);
    putAccessToken('');
    toast.success(SUCCESS_LOGOUT_NOTIFICATION);
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  fetchAuthUser,
  registerAccount,
  logout,
};
