import authUserReducer from './reducer';

/*
  authUserReducer function
  - should return the initial state when given by unknown action
  - should return authUser when given by SET_AUTH_USER action
  - should return null when given by UNSET_AUTH_USER action
*/

const ActionType = {
  UNKNOWN: 'UNKNOWN',
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = null;
    const action = {
      type: ActionType.UNKNOWN,
    };

    const actualState = authUserReducer(initialState, action);

    expect(actualState).toEqual(initialState);
  });

  it('should return authUser when given by SET_AUTH_USER action', () => {
    const initialState = null;
    const action = {
      type: ActionType.SET_AUTH_USER,
      payload: {
        authUser: {
          id: 'tester101',
          name: 'Tester101',
          email: 'tester101@gmail.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    const actualState = authUserReducer(initialState, action);

    expect(actualState).toEqual(action.payload.authUser);
  });

  it('should return null when given by UNSET_AUTH_USER action', () => {
    const initialState = {
      id: 'tester101',
      name: 'Tester101',
      email: 'tester101@gmail.com',
      avatar: 'https://generated-image-url.jpg',
    };
    const action = {
      type: ActionType.UNSET_AUTH_USER,
      payload: {
        authUser: null,
      },
    };

    const actualState = authUserReducer(initialState, action);

    expect(actualState).toBeNull();
  });
});
