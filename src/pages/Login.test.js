import React from 'react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import authUserReducer from '../states/authUser/reducer';
import '../states/authUser/action';
import Login from './Login';

/*
  Login page form input and submit integration
  - should handle form input and submit function correctly
  - should be able to link to register page
*/

const user = {
  id: 'tester101',
  name: 'Tester101',
  email: 'tester101@gmail.com',
  password: '123456',
};

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
  },
});
function LoginWrapper() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );
}

jest.mock('../states/authUser/action', () => ({
  ____esModule: true,
  ActionType: {},
  fetchAuthUser: () => ({}),
}));

describe('Login page form input and submit integration', () => {
  it('should handle form input and submit function correctly', () => {
    store.dispatch = jest.fn();
    render(<LoginWrapper />);

    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('Masuk');
    userEvent.type(emailInput, user.email);
    userEvent.type(passwordInput, user.password);
    userEvent.click(submitButton);

    expect(emailInput).toHaveValue(user.email);
    expect(passwordInput).toHaveValue(user.password);
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should be able to link to register page', () => {
    const REGISTER_PAGE_PATH = '/register';

    render(<LoginWrapper />);
    const registerPageLink = screen.getByText('Daftar di sini');
    userEvent.click(registerPageLink);

    expect(window.location.pathname).toBe(REGISTER_PAGE_PATH);
  });
});
