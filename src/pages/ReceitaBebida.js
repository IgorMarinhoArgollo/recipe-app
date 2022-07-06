/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import unfavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import Button from '../components/Button';
import ImageButton from '../components/ImageButton';
import ListaIngredientes from '../components/ListaIngredientes';
import Recomendacao from '../components/Recomendacao';
import { inProgressRecipesVerifier, doneRecipesVerifier }
  from '../services/serviceInProgress';

export default function ReceitaBebida(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [drink, setDrink] = useState({});
  const [recomendation, setRecomendation] = useState([]);
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const checkRecipeFavorite = (idDrink) => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (!favorite) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    } else {
      setRecipeIsFavorite(favorite
        .some((recipe) => Number(recipe.id) === Number(idDrink)));
    }
  };

  const fetchRecipe = async () => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const result = await response.json();
    setDrink(result.drinks[0]);
    checkRecipeFavorite(result.drinks[0].idDrink);
  };

  const fetchRecomendation = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const result = await response.json();
    setRecomendation(result.meals);
  };

  useEffect(() => {
    fetchRecipe();
    fetchRecomendation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // copy clipboard feito com a biblioteca https://www.npmjs.com/package/clipboard-copy
  const handleFavBtn = () => {
    const saveClipboard = `http://localhost:3000${history.location.pathname}`;
    setCopiedLink(true);
    copy(saveClipboard);
  };

  const handleFavoriteBtn = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (recipeIsFavorite) {
      const recipeIndex = favorite.findIndex((recipe) => drink.idDrink === recipe.id);
      favorite.splice(recipeIndex, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
      setRecipeIsFavorite(false);
    } else {
      const recipeObj = {
        id: drink.idDrink,
        type: 'bebida',
        area: '',
        category: drink.strCategory,
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
      };
      localStorage.setItem('favoriteRecipes', JSON.stringify([...favorite, recipeObj]));
      setRecipeIsFavorite(true);
    }
  };

  const handleStartRecipeBtn = () => {
    history.push(`/bebidas/${id}/in-progress`);
  };

  return (
    <div className="celphone">
      <div className="mainPage">
        <section className="recipeSection">
          <button
            type="button"
            onClick={ () => { history.push('/bebidas'); } }
            className="homeBtn"
          >
            Home
          </button>
          <div>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              className="mainImage"
            />
          </div>
          <div className="recipeHeader">
            <div className="recipeTitle">
              <h2>{drink.strDrink}</h2>
              <p>{drink.strAlcoholic}</p>
            </div>
            <div className="interactionBtn">
              <div className="shareBtn">
                <ImageButton
                  onClick={ handleFavBtn }
                  imageSrc={ shareIcon }
                  altImage="icone para compatilhar"
                />
                { copiedLink && <p className="copiedLink">Link copiado!</p>}
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
              ingredientsList={ drink }
            />
            <div>
              <h3>Instructions</h3>
              <p>{drink.strInstructions}</p>
            </div>
            <div>
              { recomendation.length > 0 && <Recomendacao
                recomendation={ recomendation }
              /> }
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
              key="startDrinkBtn"
              disabled={ false }
            />
          </div>
        </section>
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}

ReceitaBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
