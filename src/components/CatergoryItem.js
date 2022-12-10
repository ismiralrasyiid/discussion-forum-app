import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilterActionCreator } from '../states/filter/action';

function CategoryItem({ category }) {
  const { filter } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onCategoryClick = () => {
    const action = toggleFilterActionCreator(category);
    dispatch(action);
  };

  return (
    <button type="button" className={category === filter ? 'item active' : 'item'} onClick={onCategoryClick}>
      #
      {category}
    </button>
  );
}

CategoryItem.defaultProps = {
  category: 'general',
};

CategoryItem.propTypes = {
  category: PropTypes.string,
};

export default CategoryItem;
