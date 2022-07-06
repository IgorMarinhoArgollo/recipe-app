import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import expPicture from '../images/exploreMeal.png';
import '../styles/ExplorarComidas.css';

export default function ExplorarComidas() {
  const history = useHistory();

  const fetchRandonRecipe = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const result = await response.json();
    history.push(`/comidas/${result.meals[0].idMeal}`);
  };

  return (
    <div className="celphone">
      <div className="mainPage">
        <Header title="Explore Food" disabled />
        <div className="exploreFoodSection">
          <img
            className="imgExplore"
            src={ expPicture }
            alt="explore ilustration for food"
          />
          <Button
            disabled={ false }
            labelText="for Ingredients"
            onClick={ () => { history.push('/explorar/comidas/ingredientes'); } }
          />
          <Button
            disabled={ false }
            labelText="Place of origin"
            onClick={ () => { history.push('/explorar/comidas/area'); } }
          />
          <Button
            disabled={ false }
            labelText="Surprise me!"
            onClick={ fetchRandonRecipe }
          />
        </div>
        <Footer />
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
