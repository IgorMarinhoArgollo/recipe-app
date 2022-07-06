/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Button from '../components/Button';
import FavCard from '../components/FavCard';
import '../styles/ReceitasFav.css';

export default function ReceitasFav() {
  const [allFavRecipes, setAllFavRecipes] = useState([]);
  const [foodFavRecipes, setFoodFavRecipes] = useState([]);
  const [drinksFavRecipes, setDrinksFavRecipes] = useState([]);
  const [renderState, setRenderState] = useState('all');
  const [update, setUpdate] = useState(true);

  const getRecipesFromStorage = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      const foodRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'comida');
      const drinksRecipes = favoriteRecipes.filter((recipe) => recipe.type === 'bebida');
      setAllFavRecipes(favoriteRecipes);
      setFoodFavRecipes(foodRecipes);
      setDrinksFavRecipes(drinksRecipes);
    }
  };

  const removeFav = (id) => {
    const favorites = allFavRecipes.filter((element) => (element.id !== id));
    localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    setUpdate(!update);
  };

  const recipeCard = (recipeData) => recipeData.map((recipe, index) => (
    <FavCard
      key={ recipe.name }
      dataRecipe={ recipe }
      index={ index }
      onClick={ () => { removeFav(recipe.id); } }
    />
  ));

  const renderRecipes = () => {
    switch (renderState) {
    case 'all':
      return (
        recipeCard(allFavRecipes)
      );

    case 'comida':
      return (
        recipeCard(foodFavRecipes)
      );

    case 'bebida':
      return (
        recipeCard(drinksFavRecipes)
      );

    default:
      break;
    }
  };

  useEffect(() => {
    getRecipesFromStorage();
  }, [update]);

  return (
    <div className="celphone">
      <div className="mainPage">
        <div className="scroll">
          <Header title="Favorite Recipes" disabled />
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
              {renderRecipes()}
            </div>
          </div>
        </div>
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
