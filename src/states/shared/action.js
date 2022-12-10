import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';
import { setCategoriesActionCreator } from '../categories/action';
import { setThreadsActionCreator } from '../threads/action';
import { setUsersActionCreator } from '../users/action';

function fetchThreadsAndUsers() {
  return async (dispatch) => {
    try {
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers();
      const actionForThreads = setThreadsActionCreator(threads);
      const actionForUsers = setUsersActionCreator(users);

      dispatch(actionForThreads);
      dispatch(actionForUsers);
    } catch (error) {
      toast.error(error.message);
    }
  };
}

function fetchCategories(store) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const threads = await api.getAllThreads();
      threads.forEach((thread) => {
        const currentCategories = store.getState().categories;
        const isNewCategory = currentCategories.some((category) => category === thread.category);
        if (!isNewCategory) {
          const newCategories = [...currentCategories, thread.category];
          const action = setCategoriesActionCreator(newCategories);

          dispatch(action);
        }
      });
    } catch (error) {
      toast.error(error.message);
    }

    dispatch(hideLoading());
  };
}

export { fetchThreadsAndUsers, fetchCategories };
