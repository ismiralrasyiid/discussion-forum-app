import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';

const ActionType = {
  SET_USERS: 'SET_USERS',
};

function setUsersActionCreator(users) {
  return {
    type: ActionType.SET_USERS,
    payload: {
      users,
    },
  };
}

function fetchUsers() {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const users = await api.getAllUsers();
      const action = setUsersActionCreator(users);

      dispatch(action);
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

export { ActionType, setUsersActionCreator, fetchUsers };
