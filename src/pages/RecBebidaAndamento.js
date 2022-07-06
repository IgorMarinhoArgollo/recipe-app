/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import unfavoriteIcon from '../images/whiteHeartIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import ImageButton from '../components/ImageButton';
import ListaIngredientesEdit from '../components/ListaIngredientesEdit';
import EndButton from '../components/EndButton';
import { drinkInProgress } from '../services/serviceInProgress';

export default function RecComidaAndamento(props) {
  const { match: { params: { id } } } = props;
  const [drink, setDrink] = useState({});
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);
  const [inProgressList, setInProgressList] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    fetchRecipe();
    const newInProgress = drinkInProgress(id);
    setInProgressList(newInProgress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // copy clipboard feito com a biblioteca https://www.npmjs.com/package/clipboard-copy
  const handleShareBtn = () => {
    const saveClipboard = `http://localhost:3000/bebidas/${id}`;
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

  const handleCheckboxChange = ({ target }) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (target.checked) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { ...inProgress.meals },
        cocktails: { ...inProgress.cocktails,
          [id]: [...inProgress.cocktails[id],
            target.name] } }));
      setInProgressList({
        meals: { ...inProgress.meals },
        cocktails: { ...inProgress.cocktails,
          [id]: [...inProgress.cocktails[id],
            target.name] } });
    } else {
      const index = inProgress.cocktails[id]
        .findIndex((ingredient) => ingredient === target.name);
      inProgress.cocktails[id].splice(index, 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        meals: { ...inProgress.meals },
        cocktails: { ...inProgress.cocktails,
          [id]: inProgress.cocktails[id] } }));
      setInProgressList(inProgress);
    }
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
              className="mainImage"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
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
                  onClick={ handleShareBtn }
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
            <ListaIngredientesEdit
              ingredientsList={ drink }
              onChange={ handleCheckboxChange }
              dataList={ inProgressList }
            />
            <div>
              <h3>Instructions</h3>
              <p>{drink.strInstructions}</p>
            </div>
          </div>
          <div className="btnDiv">
            <EndButton
              food={ drink }
              inProgressList={ inProgressList }
            />
          </div>
        </section>
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}

RecComidaAndamento.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
