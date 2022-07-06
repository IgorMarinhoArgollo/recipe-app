import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import Button from './Button';
import '../styles/CategoryFilter.css';

export default function CategoryFilter() {
  const { apiCategoryResult, setCategorySelected,
    mealOrDrink, fetchAPI } = useContext(Context);
  const listLimit = 5;
  const [toggle, setToggle] = useState('');

  const handleCategoryButton = ({ target }) => {
    let filterParameter = 'filter.php?c=';
    const htmlText = target.innerHTML;
    if (toggle !== htmlText) {
      setCategorySelected(htmlText);
      fetchAPI(filterParameter, mealOrDrink, htmlText);
    } else {
      filterParameter = 'search.php?s=';
      fetchAPI(filterParameter, mealOrDrink);
    }
    setToggle(htmlText);
  };

  const handleButtonAll = () => {
    const filterParameter = 'search.php?s=';
    fetchAPI(filterParameter, mealOrDrink);
  };

  return (
    <div className="categoryBar">
      { apiCategoryResult.length >= 1
        && apiCategoryResult.map((category, index) => (
          index < listLimit && (
            <Button
              key={ `${category.strCategory}${index}` }
              labelText={ category.strCategory }
              onClick={ handleCategoryButton }
              disabled={ false }
              className="categoryBtn"
            />
          )
        )) }
      <Button
        labelText="All"
        onClick={ handleButtonAll }
        disabled={ false }
        className="categoryBtn"
      />
    </div>
  );
}
