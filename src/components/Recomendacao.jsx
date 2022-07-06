import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { increaseCarousel, decreaseCarousel } from '../services/serviceInProgress';

export default function Recomendacao({ recomendation }) {
  const [isVisible, setIsVisible] = useState(0);

  const listLimit = 6;
  return (
    recomendation[0].idDrink ? (
      <div>
        <h3>Recomended</h3>
        <div className="recomendedList">
          <div className="image-container">
            {recomendation.map((element, index) => (
              index < listLimit
              && (
                <Link
                  key={ element.idDrink }
                  to={ `/bebidas/${element.idDrink}` }
                  className={ index === isVisible || index === (isVisible + 1)
                    ? 'recomendedCart visible'
                    : 'recomendedCart invisible' }
                >
                  <div>
                    <img src={ element.strDrinkThumb } alt={ element.strDrink } />
                    <p>{element.strAlcoholic}</p>
                    <h3>
                      {element.strDrink}

                    </h3>
                  </div>
                </Link>)))}
          </div>
        </div>
        <div className="button-container">
          <button
            onClick={ () => decreaseCarousel(isVisible, setIsVisible) }
            type="button"
          >
            {'<'}
          </button>
          <button
            onClick={ () => increaseCarousel(isVisible, setIsVisible) }
            type="button"
          >
            {'>'}
          </button>
        </div>
      </div>)
      : (
        <div>
          <h3>Recomended</h3>
          <div className="recomendedList">
            <div className="image-container">
              {recomendation.map((element, index) => (
                index < listLimit
              && (
                <Link
                  key={ element.idMeal }
                  to={ `/comidas/${element.idMeal}` }
                  className={ index === isVisible || index === (isVisible + 1)
                    ? 'recomendedCart visible'
                    : 'recomendedCart invisible' }
                >
                  <div>
                    <img src={ element.strMealThumb } alt={ element.strMeal } />
                    <h3>
                      {element.strMeal}

                    </h3>
                  </div>
                </Link>)))}
            </div>
          </div>
          <div className="button-container">
            <button
              onClick={ () => decreaseCarousel(isVisible, setIsVisible) }
              type="button"
            >
              {'<'}
            </button>
            <button
              onClick={ () => increaseCarousel(isVisible, setIsVisible) }
              type="button"
            >
              {'>'}
            </button>
          </div>
        </div>)
  );
}

Recomendacao.propTypes = {
  recomendation: PropTypes.arrayOf(PropTypes.object).isRequired,
};
