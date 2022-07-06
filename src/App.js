import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExpComidaIngr from './pages/ExpComidasIngr';
import ExpBebidaIngr from './pages/ExpBebidasIngr';
import ExpComidaLocal from './pages/ExpComidaLocal';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFav from './pages/ReceitasFav';
import ReceitaComida from './pages/ReceitaComida';
import ReceitaBebida from './pages/ReceitaBebida';
import RecComidaAndamento from './pages/RecComidaAndamento';
import RecBebidaAndamento from './pages/RecBebidaAndamento';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <ReceitaComida { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => <ReceitaBebida { ...props } /> }
      />
      <Route
        exact
        path="/comidas/:id/in-progress"
        render={ (props) => <RecComidaAndamento { ...props } /> }
      />
      <Route
        exact
        path="/bebidas/:id/in-progress"
        render={ (props) => <RecBebidaAndamento { ...props } /> }
      />
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route exact path="/explorar/comidas/ingredientes" component={ ExpComidaIngr } />
      <Route exact path="/explorar/bebidas/ingredientes" component={ ExpBebidaIngr } />
      <Route exact path="/explorar/comidas/area" component={ ExpComidaLocal } />
      <Route exact path="/perfil" component={ Perfil } />
      <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route exact path="/receitas-favoritas" component={ ReceitasFav } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default App;
