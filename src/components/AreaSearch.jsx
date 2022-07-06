import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AreaSearch.css';

export default function AreaSearch({ areaList }) {
  const [areaSelected, setAreaSelected] = useState('All');
  const [recipesList, setRecipesList] = useState([]);
  const listLimit = 11;

  async function fetchApiFilterArea(value) {
    if (value === 'All') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setRecipesList(result.meals);
    } else {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`);
      const result = await response.json();
      setRecipesList(result.meals);
    }
  }

  function defineSelectedArea({ target }) {
    setAreaSelected(target.value);
  }

  useEffect(() => {
    fetchApiFilterArea(areaSelected);
  }, [areaSelected]);

  return (
    <div className="areaSearchContent">
      <select
        onChange={ defineSelectedArea }
      >
        <option
          value="All"
        >
          All
        </option>
        { areaList.map((area) => (
          <option
            key={ area }
            value={ area }
          >
            {area}
          </option>
        )) }
      </select>
      <div className="deckSection">
        { recipesList.length > 0
        && (recipesList.map((meal, index) => (
          index <= listLimit
              && (
                <Link
                  to={ `/comidas/${meal.idMeal}` }
                  key={ meal.idMeal }
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
    </div>
  );
}

AreaSearch.propTypes = {
  areaList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
