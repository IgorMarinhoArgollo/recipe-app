import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';

export default function DrinksCart() {
  const { apiResult } = useContext(Context);
  const listLimit = 11;
  return (
    <div className="deckSection">
      { apiResult.length >= 1
        && (apiResult.map((drink, index) => (
          index <= listLimit
              && (
                <Link
                  to={ `/bebidas/${drink.idDrink}` }
                  key={ drink.idDrink }
                >
                  <div
                    className="recipeCard"
                  >
                    <img
                      src={ drink.strDrinkThumb }
                      alt={ drink.strDrink }
                    />
                    <p>{drink.strDrink}</p>
                  </div>

                </Link>
              )
        ))
        )}
    </div>
  );
}
