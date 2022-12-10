import React from 'react';
import { useSelector } from 'react-redux';
import CategoryItem from './CatergoryItem';
import Loading from './Loading';

function Categories() {
  const { categories } = useSelector((states) => states);

  return (
    <aside className="categories">
      <h2>Hero yang lagi meta</h2>
      {categories[0] ? categories.map((category) => (
        <CategoryItem key={category} category={category} />
      )) : <Loading />}
    </aside>
  );
}

export default Categories;
