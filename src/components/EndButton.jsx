import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';

export default function EndButton(props) {
  const history = useHistory();
  const { food, inProgressList } = props;

  const buttonEnabler = () => {
    if (food.idMeal && inProgressList) {
      const ingredients = Object.entries(food).filter((element) => (
        element[0].includes('strIngredient') && element[1]));
      const checkedIngredients = inProgressList.meals[food.idMeal];
      return (ingredients.length !== checkedIngredients.length);
    }
    if (food.idDrink && inProgressList) {
      const ingredients = Object.entries(food).filter((element) => (
        element[0].includes('strIngredient') && element[1]));
      const checkedIngredients = inProgressList.cocktails[food.idDrink];
      return (ingredients.length !== checkedIngredients.length);
    }
    return true;
  };

  function historyPusher() {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (food.idMeal) {
      const finishedRecipesMeal = {
        id: food.idMeal,
        type: 'comida',
        area: food.strArea,
        category: food.strCategory,
        alcoholicOrNot: '',
        name: food.strMeal,
        image: food.strMealThumb,
        doneDate: new Intl.DateTimeFormat('pt-BR').format(new Date()),
        tags: food.strTags ? food.strTags.split(',') : [],
      };
      const array = doneRecipes
        ? [...doneRecipes, finishedRecipesMeal]
        : [finishedRecipesMeal];
      localStorage.setItem('doneRecipes', JSON.stringify(array));
    } else {
      const finishedRecipesDrink = {
        id: food.idDrink,
        type: 'bebida',
        area: '',
        category: '',
        alcoholicOrNot: food.strAlcoholic,
        name: food.strDrink,
        image: food.strDrinkThumb,
        doneDate: new Intl.DateTimeFormat('pt-BR').format(new Date()),
        tags: food.strTags ? food.strTags.split(',') : [],
      };
      const arrayDrinks = doneRecipes
        ? [...doneRecipes, finishedRecipesDrink]
        : [finishedRecipesDrink];
      localStorage.setItem('doneRecipes', JSON.stringify(arrayDrinks));
    }
    history.push('/receitas-feitas');
  }
  return (
    <div>
      <div className="buttonFixedRecipe">
        <Button
          onClick={ historyPusher }
          labelText="Finalizar Receita"
          key="finishMealBtn"
          disabled={ buttonEnabler() }
        />
      </div>
    </div>
  );
}

EndButton.propTypes = {
  inProgressList: PropTypes.objectOf(Object).isRequired,
  food: PropTypes.objectOf(String).isRequired,
};
