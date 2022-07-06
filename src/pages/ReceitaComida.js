/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import ReactPlayer from 'react-player';
import shareIcon from '../images/shareIcon.svg';
import unfavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import Button from '../components/Button';
import ImageButton from '../components/ImageButton';
import ListaIngredientes from '../components/ListaIngredientes';
import Recomendacao from '../components/Recomendacao';
import { inProgressRecipesVerifier, doneRecipesVerifier }
  from '../services/serviceInProgress';
import '../styles/ReceitaComida.css';

export default function ReceitaComida(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [meal, setMeal] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const checkRecipeFavorite = (idMeal) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setRecipeIsFavorite(favorite
        .some((recipe) => Number(recipe.id) === Number(idMeal)));
    }
  };

  const fetchRecipe = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setMeal(result.meals[0]);
    checkRecipeFavorite(result.meals[0].idMeal);
  };

  const fetchRecomendation = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setRecomendation(result.drinks);
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecomendation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // copy clipboard feito com a biblioteca https://www.npmjs.com/package/clipboard-copy
  const handleShareBtn = () => {
    const saveClipboard = `http://localhost:3000${history.location.pathname}`;
    setCopiedLink(true);
    copy(saveClipboard);
  };

  const handleFavoriteBtn = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeIsFavorite) {
      const recipeIndex = favorite.findIndex((recipe) => meal.idMeal === recipe.id);
      favorite.splice(recipeIndex, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
      setRecipeIsFavorite(false);
    } else {
      const recipeObj = {
        id: meal.idMeal,
        type: 'comida',
        area: meal.strArea,
        category: meal.strCategory,
        alcoholicOrNot: '',
        name: meal.strMeal,
        image: meal.strMealThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, recipeObj]));
      setRecipeIsFavorite(true);
    }
  };

  const handleStartRecipeBtn = () => {
    history.push(`/comidas/${id}/in-progress`);
  };

  return (
    <div className="celphone">
      <div className="mainPage">
        <section className="recipeSection">
          <button
            type="button"
            onClick={ () => { history.push('/comidas'); } }
            className="homeBtn"
          >
            Home
          </button>
          <div>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              className="mainImage"
            />
          </div>
          <div className="recipeHeader">
            <div className="recipeTitle">
              <h2>{meal.strMeal}</h2>
              <p>{meal.strCategory}</p>
            </div>
            <div className="interactionBtn">
              <div className="shareBtn">
                <ImageButton
                  onClick={ handleShareBtn }
                  imageSrc={ shareIcon }
                  altImage="icone para compatilhar"
                />
                {copiedLink && <p className="copiedLink">Link copiado!</p>}
              </div>
              <div className="shareBtn">
                <ImageButton
                  onClick={ handleFavoriteBtn }
                  imageSrc={ recipeIsFavorite ? favoriteIcon : unfavoriteIcon }
                  altImage="icone para favoritar"
                />
              </div>
            </div>
          </div>
          <div className="infoRecipes">
            <ListaIngredientes
              ingredientsList={ meal }
            />
            <div>
              <h3>Instructions</h3>
              <p>{meal.strInstructions}</p>
            </div>
            <div className="videoSection">
              <h3>Video</h3>
              <ReactPlayer
                controls
                url={ meal.strYoutube }
                width="270px"
                height="250px"
              />
            </div>
            <div>
              {recomendation.length > 0 && <Recomendacao
                recomendation={ recomendation }
              />}
            </div>
          </div>
          <div className="btnDiv">
            <Button
              className={ doneRecipesVerifier(id)
                ? 'buttonFixed doneBtn' : 'buttonFixed' }
              onClick={ handleStartRecipeBtn }
              labelText={ inProgressRecipesVerifier(id)
                ? 'Continuar Receita'
                : 'Iniciar Receita' }
              key="startMealBtn"
              disabled={ false }
            />
          </div>
        </section>
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}

ReceitaComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
