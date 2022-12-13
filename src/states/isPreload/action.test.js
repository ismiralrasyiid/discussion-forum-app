import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';
import { putAccessToken } from '../../utils/api/utils';
import { setAuthUserActionCreator } from '../authUser/action';
import { preloadingApp, setIsPreloadActionCreator } from './action';

/*
  preloadingApp thunk
  - should dispatch action correctly when data fetching success
  - should dispatch action correctly when data fetching fail
*/

const user = {
  id: 'tester101',
  name: 'Tester101',
  email: 'tester101@gmail.com',
  avatar: 'https://generated-image-url.jpg',
};
const message = 'Request failed';
const FAILED_PRELOAD_NOTIFICATION = 'Yuk login untuk pakai semua fitur';
jest.mock('../../utils/api/utils');

describe('preloadingApp thunk', () => {
  beforeEach(() => {
    api.getOwnProfileBackup = api.getOwnProfile;
    toast.errorBackup = toast.error;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getOwnProfile = () => user;
    const dispatch = jest.fn();

    await preloadingApp()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(user));
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });

  it('should dispatch action correctly when data fetching fail', async () => {
    api.getOwnProfile = () => {
      throw new Error(message);
    };
    const dispatch = jest.fn();
    toast.error = jest.fn();

    await preloadingApp()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(null));
    expect(putAccessToken).toBeCalledWith('');
    expect(toast.error).toHaveBeenCalledWith(FAILED_PRELOAD_NOTIFICATION);
    expect(dispatch).toHaveBeenCalledWith(setIsPreloadActionCreator(false));
  });

  afterEach(() => {
    api.getOwnProfile = api.getOwnProfileBackup;
    toast.error = toast.errorBackup;

    delete api.getOwnProfileBackup;
    delete toast.errorBackup;
  });
});
