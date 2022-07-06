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
import { mealInProgress } from '../services/serviceInProgress';

export default function RecComidaAndamento(props) {
  const { match: { params: { id } } } = props;
  const [meal, setMeal] = useState({});
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);
  const [inProgressList, setInProgressList] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);
  const history = useHistory();

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

  useEffect(() => {
    fetchRecipe();
    const newInProgress = mealInProgress(id);
    setInProgressList(newInProgress);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // copy clipboard feito com a biblioteca https://www.npmjs.com/package/clipboard-copy
  const handleShareBtn = () => {
    const saveClipboard = `http://localhost:3000/comidas/${id}`;
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

  const handleCheckboxChange = ({ target }) => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (target.checked) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...inProgress.cocktails },
        meals: { ...inProgress.meals,
          [id]: [...inProgress.meals[id],
            target.name] },
      }));
      setInProgressList({
        cocktails: { ...inProgress.cocktails },
        meals: { ...inProgress.meals,
          [id]: [...inProgress.meals[id],
            target.name] } });
    } else {
      const index = inProgress.meals[id]
        .findIndex((ingredient) => ingredient === target.name);
      inProgress.meals[id].splice(index, 1);
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...inProgress.cocktails },
        meals: { ...inProgress.meals,
          [id]: inProgress.meals[id] } }));
      setInProgressList(inProgress);
    }
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
              className="mainImage"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
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
              ingredientsList={ meal }
              onChange={ handleCheckboxChange }
              dataList={ inProgressList }
            />
            <div>
              <h3>Instructions</h3>
              <p>{meal.strInstructions}</p>
            </div>
          </div>
          <div className="btnDiv">
            <EndButton
              food={ meal }
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
