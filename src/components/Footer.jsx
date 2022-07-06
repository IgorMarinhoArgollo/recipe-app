import React from 'react';
import { useHistory } from 'react-router';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import ImageButton from './ImageButton';
import '../styles/Footer.css';

export default function Footer() {
  const history = useHistory();

  const handleDrinkClick = () => {
    history.push('/bebidas');
  };

  const handleMealClick = () => {
    history.push('/comidas');
  };

  const handleExploreClick = () => {
    history.push('/explorar');
  };

  return (
    <footer>
      <div className="footerBar">
        <ImageButton
          onClick={ handleDrinkClick }
          imageSrc={ drinkIcon }
          altImage="icone de bebidas"
          className="footerBtn"
        />
        <ImageButton
          onClick={ handleExploreClick }
          imageSrc={ exploreIcon }
          altImage="icone de explorar"
          className="footerBtn"
        />
        <ImageButton
          onClick={ handleMealClick }
          imageSrc={ mealIcon }
          altImage="icone de comidas"
          className="footerBtn"
        />
      </div>
    </footer>
  );
}
