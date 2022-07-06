import PropTypes from 'prop-types';
import React from 'react';

export default function ListaIngredientes({ ingredientsList }) {
  const renderIngredients = () => {
    const ingredients = Object.entries(ingredientsList).filter((element) => (
      element[0].includes('strIngredient') && element[1]));
    const measures = Object.entries(ingredientsList).filter((element) => (
      element[0].includes('strMeasure') && element[1]));
    return (ingredients.map((element, index) => (
      <li key={ element[0] }>
        {`${element[1]} - ${!measures[index] ? 'to taste' : measures[index][1]}`}
      </li>)));
  };

  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {renderIngredients()}
      </ul>
    </div>
  );
}

ListaIngredientes.propTypes = {
  ingredientsList: PropTypes.objectOf(PropTypes.string).isRequired,
};
