import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientsDeck from '../components/IngredientsDeck';
import '../styles/ExpComidasIngr.css';

export default function ExpComidaIngr() {
  const [ingredientsList, setIngredientsList] = useState([]);

  async function fetchApiIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const result = await response.json();
    const ingredientsLimit = 12;
    const filtredIngredients = result.meals
      .filter((_, i) => i < ingredientsLimit);
    setIngredientsList(filtredIngredients);
  }

  useEffect(() => {
    fetchApiIngredients();
  }, []);

  return (
    <div className="celphone">
      <div className="mainPage">
        <Header title="Explore Ingredients" disabled />
        {ingredientsList.length > 0
            && <IngredientsDeck list={ ingredientsList } address="themealdb" />}
        <Footer />
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
