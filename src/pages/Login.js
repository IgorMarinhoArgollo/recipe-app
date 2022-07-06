/* eslint-disable no-alert */
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import logo from '../images/recipes.png';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnIsDisabled, setBtnIsDisabled] = useState(true);
  const history = useHistory();

  const verifyInput = () => {
    const emailValidation = /\S+@\S+.com/;
    const emailVerified = emailValidation.test(email);
    const passwordMinLength = 6;
    if (emailVerified && password.length >= passwordMinLength) {
      setBtnIsDisabled(false);
    } else {
      setBtnIsDisabled(true);
    }
  };

  const handleChangeEmail = ({ target }) => {
    setEmail(target.value);
    verifyInput();
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    verifyInput();
  };

  const handleClick = () => {
    const objStorage = { email };
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify(objStorage));
    history.push('/comidas');
  };

  const alert = () => {
    window.alert('Use "email@email.com" as email and "1234567" as password');
  };

  return (
    <div className="celphone">
      <div className="loginPage">
        <img
          className="logoImg"
          src={ logo }
          alt="app logo"
        />
        <h3>Trybe Recipes</h3>
        <Input
          placeholder="E-mail"
          type="text"
          onChange={ handleChangeEmail }
          value={ email }
        />
        <Input
          placeholder="Password"
          type="password"
          onChange={ handleChangePassword }
          value={ password }
        />
        <Button
          labelText="Enter"
          disabled={ btnIsDisabled }
          onClick={ handleClick }
          className="loginBtn"
        />
      </div>
      <Link className="celphoneBtn" to="/" />
      { alert() }
    </div>
  );
}

export default Login;
