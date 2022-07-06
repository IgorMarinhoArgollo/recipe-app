import React, { useEffect, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import DrinksCart from '../components/DrinksCart';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import CategoryFilter from '../components/CategoryFilter';

export default function Bebidas() {
  const { setMealOrDrink, fetchAPI, fetchCategoryAPI,
    setCategorySelected,
  } = useContext(Context);
  const { state } = useLocation();
  const drink = 'thecocktaildb';
  const filter = !state ? 'search.php?s=' : state.filter;
  const value = !state ? '' : state.value;

  useEffect(() => {
    setMealOrDrink(drink);
    fetchAPI(filter, drink, value);
    fetchCategoryAPI(drink);
    setCategorySelected('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="celphone">
      <div className="mainPage">
        <Header title="Drinks" />
        <CategoryFilter />
        <DrinksCart />
        <Footer />
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>);
}
