import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Context from '../context/Context';

function UserProvider({ children }) {
  const [apiResult, setApiResult] = useState([]);
  const [mealOrDrink, setMealOrDrink] = useState('themealdb');
  const [apiCategoryResult, setApiCategoryResult] = useState([]);
  const [categorySelected, setCategorySelected] = useState('');
  const history = useHistory();

  const recipesDetail = (recipes, id, filter) => {
    const { location: { pathname } } = history;
    const filterParameter = 'filter.php?c=';
    if (recipes.length === 1 && filter !== filterParameter) {
      history.push(`${pathname}/${id}`);
    }
  };

  async function fetchAPI(filter, adressParameter = 'themealdb', value = '') {
    const response = await fetch(`https://www.${adressParameter}.com/api/json/v1/1/${filter}${value}`);
    const result = await response.json();
    if (result.meals && adressParameter === 'themealdb') {
      const mealsList = result.meals;
      setApiResult(mealsList);
      recipesDetail(mealsList, mealsList[0].idMeal, filter);
    } else if (result.drinks && adressParameter === 'thecocktaildb') {
      const drinksList = result.drinks;
      setApiResult(drinksList);
      recipesDetail(drinksList, drinksList[0].idDrink, filter);
    } else {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  async function fetchCategoryAPI(adressParameter = 'themealdb') {
    const response = await fetch(`https://www.${adressParameter}.com/api/json/v1/1/list.php?c=list`);
    const result = await response.json();
    if (result.meals && adressParameter === 'themealdb') {
      const mealsList = result.meals;
      setApiCategoryResult(mealsList);
    }
    if (result.drinks && adressParameter === 'thecocktaildb') {
      const drinksList = result.drinks;
      setApiCategoryResult(drinksList);
    }
  }

  const ContextObj = {
    apiResult,
    setApiResult,
    fetchAPI,
    setMealOrDrink,
    mealOrDrink,
    apiCategoryResult,
    setApiCategoryResult,
    fetchCategoryAPI,
    categorySelected,
    setCategorySelected,
  };

  return (
    <Context.Provider value={ ContextObj }>
      {children}
    </Context.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserProvider;
