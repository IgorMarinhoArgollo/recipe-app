import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/MealsCart.css';

export default function MealsCart() {
  const { apiResult } = useContext(Context);
  const listLimit = 11;
  return (
    <div className="deckSection">
      { apiResult.length >= 1
        && (apiResult.map((meal, index) => (
          index <= listLimit
              && (
                <Link
                  to={ `/comidas/${meal.idMeal}` }
                  key={ ` ${meal.strMeal} ${index}` }
                >
                  <div
                    className="recipeCard"
                  >
                    <img
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                    />
                    <p>{meal.strMeal}</p>
                  </div>
                </Link>
              )
        ))
        )}
    </div>
  );
}
