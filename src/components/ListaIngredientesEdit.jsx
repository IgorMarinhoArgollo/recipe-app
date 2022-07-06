import PropTypes from 'prop-types';
import React from 'react';

export default function ListaIngredientesEdit({ ingredientsList, onChange, dataList }) {
  const isChecked = (name) => {
    if (dataList) {
      if (ingredientsList.idMeal) {
        return dataList.meals[ingredientsList.idMeal]
          .some((ingredient) => ingredient === name);
      }
      return dataList.cocktails[ingredientsList.idDrink]
        .some((ingredient) => ingredient === name);
    }
    return false;
  };

  const renderIngredients = () => {
    const ingredients = Object.entries(ingredientsList).filter((element) => (
      element[0].includes('strIngredient') && element[1]));
    const measures = Object.entries(ingredientsList).filter((element) => (
      element[0].includes('strMeasure') && element[1]));
    return (ingredients.map((element, index) => (
      <div key={ element[0] }>
        <label
          htmlFor={ element[0] }
          className={ isChecked(element[1]) ? 'checked' : '' }
        >
          <input
            id={ element[0] }
            type="checkbox"
            checked={ isChecked(element[1]) }
            onChange={ onChange }
            name={ element[1] }
          />
          {`${element[1]} - ${!measures[index] ? 'to taste' : measures[index][1]}`}
        </label>
      </div>
    )));
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <div>
        {renderIngredients()}
      </div>
    </div>
  );
}

ListaIngredientesEdit.propTypes = {
  ingredientsList: PropTypes.objectOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  dataList: PropTypes.objectOf(Object).isRequired,
};
