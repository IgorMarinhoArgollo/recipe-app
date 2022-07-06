import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import exploreImg from '../images/explore.png';
import '../styles/Explorar.css';

export default function Explorar() {
  const history = useHistory();
  return (
    <div className="celphone">
      <div className="mainPage">
        <Header title="Explore" disabled />
        <div className="exploreSection">
          <img
            src={ exploreImg }
            className="imgExplore"
            alt="explore ilustration"
          />
          <Button
            className="exploreBtn"
            disabled={ false }
            labelText="Explore Food"
            onClick={ () => { history.push('/explorar/comidas'); } }
          />
          <Button
            className="exploreBtn"
            disabled={ false }
            labelText="Explore Drinks"
            onClick={ () => { history.push('/explorar/bebidas'); } }
          />
        </div>
        <Footer />
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
