import React from 'react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import filterReducer from '../states/filter/reducer';
import CategoryItem from './CategoryItem';

/**
 *  CategoryItem and redux store integration
 *  - should set filter state and add active class when clicked
 *  - should remove filter state and active class when clicked again
 */

const category = 'react';

const store = configureStore({
  reducer: {
    filter: filterReducer,
  },
});
function CategoryItemWrapper() {
  return (
    <Provider store={store}>
      <CategoryItem category={category} />
    </Provider>
  );
}

describe('CategoryItem and redux store integration', () => {
  it('should set filter state and add active class when clicked', () => {
    render(<CategoryItemWrapper />);
    const categoryButton = screen.getByText(new RegExp(category));

    userEvent.click(categoryButton);
    const categoryButtonWithActiveClass = document.getElementsByClassName('active')[0];
    const filterState = store.getState().filter;

    expect(categoryButtonWithActiveClass).toBeDefined();
    expect(filterState).toBe(category);
  });

  it('should remove filter state and active class when clicked again', () => {
    render(<CategoryItemWrapper />);
    const categoryButton = screen.getByText(new RegExp(category));

    userEvent.click(categoryButton);
    const categoryButtonWithActiveClass = document.getElementsByClassName('active')[0];
    const filterState = store.getState().filter;

    expect(categoryButtonWithActiveClass).not.toBeDefined();
    expect(filterState).toBe('');
  });
});
