import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Button from '../components/Button';
import profilePicture from '../images/profile.png';
import '../styles/Perfil.css';

export default function Perfil() {
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const emailStorage = JSON.parse(localStorage.getItem('user'));
    if (emailStorage) {
      setEmail(emailStorage.email);
    }
  }, []);

  const logoutBtn = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="celphone">
      <div className="mainPage">
        <Header title="Profile" disabled />
        <div className="exploreFoodSection">
          <img
            className="imgExplore"
            src={ profilePicture }
            alt="profile ilustration"
          />
          <p>{ `E-mail: ${email}` }</p>
          <Button
            disabled={ false }
            onClick={ () => { history.push('/receitas-feitas'); } }
            labelText="Receitas Feitas"
            className="profileBtn"
          />
          <Button
            disabled={ false }
            onClick={ () => { history.push('/receitas-favoritas'); } }
            labelText="Receitas Favoritas"
            className="profileBtn"
          />
          <Button
            disabled={ false }
            onClick={ logoutBtn }
            labelText="Sair"
            className="profileBtn"
          />
        </div>
        <Footer />
      </div>
      <Link className="celphoneBtn" to="/" />
    </div>
  );
}
