/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import DoneCard from '../components/DoneCard';
import '../styles/ReceitasFeitas.css';

export default function ReceitasFeitas() {
  const [allDoneRecipes, setAllDoneRecipes] = useState([]);
  const [foodDoneRecipes, setFoodDoneRecipes] = useState([]);
  const [drinksDoneRecipes, setDrinksDoneRecipes] = useState([]);
  const [renderState, setRenderState] = useState('all');

  const getRecipesFromStorage = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes) {
      const foodRecipes = doneRecipes.filter((recipe) => recipe.type === 'comida');
      const drinksRecipes = doneRecipes.filter((recipe) => recipe.type === 'bebida');
      setAllDoneRecipes(doneRecipes);
      setFoodDoneRecipes(foodRecipes);
      setDrinksDoneRecipes(drinksRecipes);
    }
  };

  const recipeCard = (recipeData) => recipeData.map((recipe, index) => (
    <DoneCard
      key={ recipe.name }
      dataRecipe={ recipe }
      index={ index }
    />
  ));

  const renderRecipes = () => {
    switch (renderState) {
    case 'all':
      return (
        recipeCard(allDoneRecipes)
      );

    case 'comida':
      return (
        recipeCard(foodDoneRecipes)
      );

    case 'bebida':
      return (
        recipeCard(drinksDoneRecipes)
      );

    default:
      break;
    }
  };

  useEffect(() => {
    getRecipesFromStorage();
  }, []);

  return (
    <div className="celphone">
      <div className="mainPage">
        <div className="scroll">
          <Header title="Done Recipes" />
          <div className="doneRecipesPage">
            <div className="filterBtn">
              <Button
                labelText="All"
                disabled={ false }
                onClick={ () => { setRenderState('all'); } }
                key="filter-by-all-btn"
              />
              <Button
                labelText="Food"
                disabled={ false }
                onClick={ () => { setRenderState('comida'); } }
                key="filter-by-food-btn"
              />
              <Button
                labelText="Drinks"
                disabled={ false }
                onClick={ () => { setRenderState('bebida'); } }
                key="filter-by-drink-btn"
              />
            </div>
            <div className="doneDeck">
              { renderRecipes() }
            </div>
          </div>
        </div>
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
