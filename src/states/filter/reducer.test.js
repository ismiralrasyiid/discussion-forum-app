import filterReducer from './reducer';

/*
  filterReducer function
  - should return the initial state when given by unknown action
  - should return a new category string when given by TOGGLE_FILTER action
    if the initial state is different with the new category
  - should return an empty string when given by TOGGLE_FILTER action
    if the initial state is the same with the new category
*/

const ActionType = {
  UNKNOWN: 'UNKNOWN',
  TOGGLE_FILTER: 'TOGGLE_FILTER',
};
const firstCategory = 'react';
const secondCategory = 'jest';

describe('filterReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = '';
    const action = {
      type: ActionType.UNKNOWN,
    };

    const actualState = filterReducer(initialState, action);

    expect(actualState).toEqual(initialState);
  });

  it('should return a new category string when given by TOGGLE_FILTER action if the initial state is different with the new category', () => {
    const initialState = firstCategory;
    const action = {
      type: ActionType.TOGGLE_FILTER,
      payload: {
        category: secondCategory,
      },
    };

    const actualState = filterReducer(initialState, action);

    expect(actualState).toEqual(action.payload.category);
  });

  it('should return an empty string when given by TOGGLE_FILTER action if the initial state is the same with the new category', () => {
    const initialState = firstCategory;
    const action = {
      type: ActionType.TOGGLE_FILTER,
      payload: {
        category: firstCategory,
      },
    };

    const actualState = filterReducer(initialState, action);

    expect(actualState).toEqual('');
  });
});
