import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import Input from './Input';
import Button from './Button';
import Context from '../context/Context';
import ImageButton from './ImageButton';
import '../styles/Header.css';

export default function Header({ title, disabled = false }) {
  const [enableInput, setEnableInput] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [checkedRadio, setCheckedRadio] = useState('');
  const { fetchAPI, mealOrDrink } = useContext(Context);
  const history = useHistory();

  const handleProfileClick = () => {
    history.push('/perfil');
  };

  const handleSearchClick = () => {
    setEnableInput(!enableInput);
  };

  const handleChangeSearch = ({ target }) => {
    setInputValue(target.value);
  };

  const handleChecked = ({ target }) => {
    setCheckedRadio(target.value);
  };

  const handleSearchBtn = () => {
    if (checkedRadio === 'search.php?f=' && inputValue.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      fetchAPI(checkedRadio, mealOrDrink, inputValue);
    }
  };

  return (
    <header className="Header">
      <div className="headerBar">
        <ImageButton
          onClick={ handleProfileClick }
          imageSrc={ profile }
          altImage="foto de perfil"
          className="headerBtn"
        />

        {title === 'Explore Ingredients' || title === 'Favorite Recipes'
          ? <h3 className="exploreIngr">{title}</h3>
          : <h2>{title}</h2>}

        {title === 'Drinks' || title === 'Food' ? (
          <ImageButton
            onClick={ handleSearchClick }
            imageSrc={ search }
            altImage="icone de busca"
            className="headerBtn"
          />) : ''}
      </div>

      {!disabled
        ? (
          <div>
            {enableInput
                && (
                  <div className="headerSearchBar">
                    <div className="inputAndBtn">
                      <Input
                        placeholder="Seach"
                        onChange={ handleChangeSearch }
                        value={ inputValue }
                      />
                      <Button
                        className="searchBtn"
                        labelText="Search"
                        disabled={ false }
                        onClick={ handleSearchBtn }
                      />
                    </div>

                    <div className="headerRadio">
                      <Input
                        type="radio"
                        labelText="Ingridients"
                        value="filter.php?i="
                        name="SearchOption"
                        onChange={ handleChecked }
                      />
                      <Input
                        type="radio"
                        labelText="Name"
                        value="search.php?s="
                        name="SearchOption"
                        onChange={ handleChecked }
                      />
                      <Input
                        type="radio"
                        labelText="Letter"
                        value="search.php?f="
                        name="SearchOption"
                        onChange={ handleChecked }
                      />
                    </div>
                  </div>
                )}
          </div>
        ) : ''}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Header.defaultProps = {
  disabled: false,
};
