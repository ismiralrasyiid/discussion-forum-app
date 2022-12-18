import React from 'react';
import '@testing-library/jest-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import categoriesReducer from '../states/categories/reducer';
import Categories from './Categories';
import { setCategoriesActionCreator } from '../states/categories/action';

/*
  Categories section and redux store integration
  - should render loading component when categories is empty
  - should render category items based on store
*/

const categories = ['react', 'general', 'jest'];

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});
function CategoriesWrapper() {
  return (
    <Provider store={store}>
      <Categories />
    </Provider>
  );
}

describe('Categories section and redux store integration', () => {
  it('should render loading component when categories is empty', () => {
    render(<CategoriesWrapper />);
    const loadingElement = document.getElementsByClassName('loading')[0];

    expect(loadingElement).toBeDefined();
  });

  it('should render category items based on store', () => {
    store.dispatch(setCategoriesActionCreator(categories));

    render(<CategoriesWrapper />);
    const categoryItems = document.getElementsByClassName('item');

    expect(categoryItems[0]).toHaveTextContent(new RegExp(categories[0]));
    expect(categoryItems[1]).toHaveTextContent(new RegExp(categories[1]));
    expect(categoryItems[2]).toHaveTextContent(new RegExp(categories[2]));
  });
});
