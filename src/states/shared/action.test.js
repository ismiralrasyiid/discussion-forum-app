import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';
import { setCategoriesActionCreator } from '../categories/action';
import { fetchCategories } from './action';

/*
  fetchCategories thunk
  - should dispatch action correctly when data fetching resolves new category
    (show loading, fetch threads api, set new categories, hide loading)
  - should dispatch action correctly when data fetching resolves no new category
    (show loading, fetch threads api, make sure not set category duplication, hide loading)
  - should dispatch action correctly when data fetching rejects request
    (show loading, fetch threads api, show error message, hide loading)
*/

const threadsWithNewCategory = [
  {
    id: 'thread-1',
    category: 'general',
  },
  {
    id: 'thread-2',
    category: 'react',
  },
  {
    id: 'thread-3',
    category: 'jest',
  },
];
const threadsWithoutNewCategory = [
  {
    id: 'thread-1',
    category: 'general',
  },
  {
    id: 'thread-2',
    category: 'react',
  },
  {
    id: 'thread-3',
    category: 'react',
  },
];
const initialCategories = ['general', 'react'];
const newCategories = ['general', 'react', 'jest'];
const duplicationCategories = ['general', 'react', 'react'];
const message = 'Request failed';

describe('fetchCategories thunk', () => {
  beforeEach(() => {
    api.getAllThreadsBackup = api.getAllThreads;
    toast.errorBackup = toast.error;
  });

  it('should dispatch action correctly when data fetching resolves new category', async () => {
    api.getAllThreads = () => threadsWithNewCategory;
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      categories: initialCategories,
    }));

    await fetchCategories()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(setCategoriesActionCreator(newCategories));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching resolves no new category', async () => {
    api.getAllThreads = () => threadsWithoutNewCategory;
    const dispatch = jest.fn();
    const getState = jest.fn(() => ({
      categories: initialCategories,
    }));

    await fetchCategories()(dispatch, getState);

    expect(getState).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).not.toHaveBeenCalledWith(setCategoriesActionCreator(duplicationCategories));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  it('should dispatch action correctly when data fetching rejects request', async () => {
    api.getAllThreads = () => {
      throw new Error(message);
    };
    const dispatch = jest.fn();
    const getState = {};
    toast.error = jest.fn();

    await fetchCategories()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(toast.error).toHaveBeenCalledWith(message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  afterEach(() => {
    api.getAllThreads = api.getAllThreadsBackup;
    toast.error = toast.errorBackup;

    delete api.getAllThreadsBackup;
    delete toast.errorBackup;
  });
});
