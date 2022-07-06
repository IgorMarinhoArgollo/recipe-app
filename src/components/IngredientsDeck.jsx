import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function IngredientsDeck({ list, address }) {
  return (
    <div className="ingredientDeck">
      { list.map((ingredient) => (
        <Link
          to={ { pathname: address === 'themealdb' ? '/comidas' : '/bebidas',
            state: { filter: 'filter.php?i=', value: ingredient.strIngredient } } }
          key={ ingredient.strIngredient }
        >
          <div
            className="ingredientCard"
          >
            <img
              src={ `https://www.${address}.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt={ `imagem de ${ingredient.strIngredient}` }
            />
            <h2>
              {ingredient.strIngredient}
            </h2>
          </div>
        </Link>
      )) }
    </div>
  );
}

IngredientsDeck.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  address: PropTypes.string.isRequired,
};
