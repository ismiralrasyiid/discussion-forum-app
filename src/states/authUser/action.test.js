import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { toast } from 'react-toastify';
import { api } from '../../utils';
import { registerAccount } from './action';

/**
 *  registerAccount thunk
 *  - should dispatch action correctly when data fetching success
 *    (show loading, fetch register api, show success message, hide loading)
 *  - should dispatch action correctly when data fetching fail
 *    (show loading, fetch register api, show error message, hide loading)
 */

const registerData = {
  username: 'Tester101',
  email: 'tester101@gmail.com',
  password: '123456',
};
const SUCCESS_REGISTER_NOTIFICATION = `${registerData.username} berhasil didaftarkan`;
const message = 'Request failed';

describe('registerAccount thunk', () => {
  beforeEach(() => {
    api.registerBackup = api.register;
    toast.successBackup = toast.success;
    toast.errorBackup = toast.error;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.register = jest.fn((user) => ({
      ...user,
      name: user.username,
    }));
    const dispatch = jest.fn();
    toast.success = jest.fn();

    await registerAccount(registerData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(api.register).toHaveBeenCalledWith(registerData);
    expect(toast.success).toHaveBeenCalledWith(SUCCESS_REGISTER_NOTIFICATION);
  });

  it('should dispatch action correctly when data fetching fail', async () => {
    api.register = jest.fn(() => {
      throw new Error(message);
    });
    const dispatch = jest.fn();
    toast.error = jest.fn();

    await registerAccount(registerData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(api.register).toHaveBeenCalledWith(registerData);
    expect(toast.error).toHaveBeenCalledWith(message);
  });

  afterEach(() => {
    api.register = api.registerBackup;
    toast.success = toast.successBackup;
    toast.error = toast.errorBackup;

    delete api.registerBackup;
    delete toast.successBackup;
    delete toast.errorBackup;
  });
});
